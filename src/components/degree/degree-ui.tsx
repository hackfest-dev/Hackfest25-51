interface Data {
  fullName: String;
  studentId: String;
  email: String;
  profilePhoto: File | null;
  universityName: String;
  degreeName: String;
  graduationYear: String;
  issueDate: String;
  duration: String;
  cgpa: String;
}

export default function Degree(props: Data) {
  return (
    <div className="w-full max-w-3xl bg-white scale-90 origin-top">
      <div className="p-6 border-16 border-double border-indigo-900 m-6 relative">
        {/* University Logo/Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-serif text-indigo-900 mb-2">{props.universityName}</h1>
          <div className="h-0.5 w-1/3 bg-indigo-900 mx-auto"></div>
        </div>

        {/* Certificate Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-serif text-indigo-900 mb-3">Certificate of Completion</h2>
          <p className="text-base text-gray-700">This is to certify that:</p>
        </div>

        {/* Student Photo */}
        {props.profilePhoto && (
          <div className="flex justify-center mb-6">
            <img
              src={URL.createObjectURL(props.profilePhoto)}
              alt="Profile Photo"
              className="w-24 h-24 rounded-full border-4 border-indigo-200 shadow-lg"
            />
          </div>
        )}

        {/* Student Name */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-indigo-900 border-b-2 border-indigo-300 inline-block px-6 py-1">
            {props.fullName}
          </h3>
        </div>

        <div className="text-center mb-8">
          <p className="text-base leading-relaxed text-gray-800">
            having Student ID <span className="font-semibold">{props.studentId}</span>, 
            has successfully completed the <span className="font-semibold">{props.degreeName}</span> program 
            with a duration of <span className="font-semibold">{props.duration}</span> years 
            and has achieved a CGPA of <span className="font-semibold">{props.cgpa}</span>.
          </p>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-2 gap-6 mb-8 text-gray-700">
          <div className="text-center">
            <p className="font-medium">Contact Email:</p>
            <p className="text-sm">{props.email}</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Graduation Year:</p>
            <p className="text-sm">{props.graduationYear}</p>
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="flex justify-center items-end mt-8">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">Issue Date</p>
            <p className="font-medium italic text-sm">{props.issueDate}</p>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="transform rotate-45">
            <h1 className="text-8xl font-bold text-indigo-900">{props.universityName}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}