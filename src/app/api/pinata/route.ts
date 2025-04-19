import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const pinataApiKey = process.env.PINATA_API_KEY;
  const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

  if (!pinataApiKey || !pinataSecretApiKey) {
    return NextResponse.json({ error: 'Pinata API keys missing' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('profilePhoto') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No profile photo uploaded' }, { status: 400 });
    }

    const metadata: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (key !== 'profilePhoto') {
        metadata[key] = value.toString();
      }
    });

    const pinataForm = new FormData();
    pinataForm.append('file', file);

    pinataForm.append(
      'pinataMetadata',
      JSON.stringify({
        name: `${metadata.fullName || 'certificate'}_file`,
        keyvalues: metadata,
      })
    );

    pinataForm.append(
      'pinataOptions',
      JSON.stringify({
        cidVersion: 1,
      })
    );

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataSecretApiKey,
      },
      body: pinataForm as any,
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result.error?.message || JSON.stringify(result.error) || 'Pinata upload failed' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      ipfsHash: result.IpfsHash,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in POST /api/pinata:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
