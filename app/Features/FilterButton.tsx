interface Filter {
    filter: string,
    setFilter : (filterType: string ) => void
}

export default function FilterButton({filter, setFilter}: Filter){
    return (
         <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 flex border border-gray-200">
            {['all', 'active', 'completed'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 capitalize ${filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>
    )
}