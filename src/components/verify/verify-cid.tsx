'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Degree from '../degree/degree-ui';

let cid = {
    cgpa: "9",
    degreeName: "BE",
    duration: "4",
    email: "sagarsuma11@gmail.com",
    fullName: "sagar",
    graduationYear: "2026",
    issueDate: "2025-12-31",
    profilePhoto: null,
    studentId: "vv33",
    universityName: "vvce",
}
let { fullName, studentId ,...left} =cid;

export default function VerifyCID() {
    const params = useParams();
    const cid = params.cid;
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchImage() {
            if (!cid) {
                setError('No CID provided');
                setLoading(false);
                return;
            }

            try {
                const url = `https://ipfs.io/ipfs/${cid}`;
                // Test if the image can be loaded
                const response = await fetch(url);

                console.log(response);

                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }

                setImageUrl(url);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            }
        }

        fetchImage();
    }, [cid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#dc2626' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: '1.25rem' }}>Not Verified</span>
            </div>
        );
    }

    if (!imageUrl) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#dc2626' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: '1.25rem' }}>Not Verified</span>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#16a34a' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: '1.25rem' }}>Verified</span>
            </div>
            <Degree fullName={fullName} studentId={studentId} {...left} />
        </div>

    );
}