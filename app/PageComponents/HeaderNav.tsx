export default function HeaderNav() {
    const navName = [
        'Dashboard',
        'Tasks'
    ]
    return (
        <nav className="hidden md:flex items-center gap-6">
            {
                navName.map((element, key) => (
                    <a href="#" key={key} className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">{element}</a>
                ))
            }
        </nav>
    )
}