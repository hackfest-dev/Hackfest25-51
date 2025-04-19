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
      <div className="w-full max-w-4xl bg-white">
        {/* Certificate Border */}
        <div className="p-8 border-16 border-double border-indigo-900 m-8 relative">
          {/* University Logo/Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-indigo-900 mb-2">{props.universityName}</h1>
            <div className="h-0.5 w-1/3 bg-indigo-900 mx-auto"></div>
          </div>
  
          {/* Certificate Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif text-indigo-900 mb-4">Certificate of Completion</h2>
            <p className="text-lg text-gray-700">This is to certify that</p>
          </div>
  
          {/* Student Details */}
          <div className="flex items-center justify-between mb-12">
            {/* Student Photo */}
            {props.profilePhoto && (
              <div className="absolute top-8 right-8">
                <img
                  src={URL.createObjectURL(props.profilePhoto)}
                  alt="Profile Photo"
                  className="w-32 h-32 rounded-full border-4 border-indigo-200 shadow-lg"
                />
              </div>
            )}
            
            {/* Student Name */}
            <div className="text-center w-full">
              <h3 className="text-3xl font-bold text-indigo-900 border-b-2 border-indigo-300 inline-block px-8 py-2">
                {props.fullName}
              </h3>
            </div>
          </div>
  
          {/* Certificate Body */}
          <div className="text-center mb-12">
            <p className="text-lg leading-relaxed text-gray-800">
              having Student ID <span className="font-semibold">{props.studentId}</span>, 
              has successfully completed the <span className="font-semibold">{props.degreeName}</span> program 
              with a duration of <span className="font-semibold">{props.duration}</span> years 
              and has achieved a CGPA of <span className="font-semibold">{props.cgpa}</span>.
            </p>
          </div>
  
          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-8 mb-12 text-gray-700">
              <div className="text-center">
                  <p className="font-medium">Contact Email:</p>
                  <p>{props.email}</p>
              </div>
              <div className="text-center">
                  <p className="font-medium">Graduation Year:</p>
                  <p>{props.graduationYear}</p>
                  </div>
          </div>
  
          {/* Certificate Footer */}
          <div className="flex justify-center items-end mt-16">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Issue Date</p>
              <p className="font-medium italic">{props.issueDate}</p>
            </div>
          </div>
  
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <div className="transform rotate-45">
              <h1 className="text-9xl font-bold text-indigo-900">{props.universityName}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }