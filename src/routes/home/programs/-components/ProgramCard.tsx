interface ProgramCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  imageUrl?: string;
  category: string;
}

export default function ProgramCard({
  id,
  title,
  description,
  duration,
  imageUrl,
  category,
}: ProgramCardProps) {
  return (
    <div className="flex h-full max-w-[400px] flex-col border border-gray-200 rounded-sm p-6 font-sans">
      <div className="flex justify-between items-center text-sm tracking-widest text-gray-600 mb-4">
        <span>
          {id} / {category.toUpperCase()}
        </span>
        <span>{duration.toUpperCase()}</span>
      </div>

      <div className="mb-6 h-48 overflow-hidden rounded-xl bg-gray-100">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <h2 className="text-3xl font-medium leading-tight mb-4 text-gray-900 line-clamp-2">
        {title}
      </h2>

      <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-1">
        {description}
      </p>

      <button className="w-full bg-[#004aad] hover:bg-[#003a8c] text-white py-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors line-clamp-3">
        Enroll
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </button>
    </div>
  );
}
