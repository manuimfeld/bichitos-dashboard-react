import { Link, NavLink } from "react-router-dom";

export const AsideMenu = () => {
  return (
    <nav className="hidden md:block text-xs border-r border-[#E5E7EB] dark:border-[#2D2F40] col-start-1 row-start-1 row-end-3 dark:bg-[#020817] dark:text-white text-black bg-white">
      <div className="h-12 flex items-center justify-center">
        <Link to="/dashboard">
          <img src="/bichitos-logo.webp" width={40} height={40} alt="logo" />
        </Link>
      </div>
      <ul className="text-[16px] flex flex-col items-start font-light w-full px-10 mt-2">
        <li className="font-normal mt-2 hover:bg-[#f5f5f5] dark:hover:bg-[#2D2F40] w-full px-4 rounded-sm py-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
            <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
          </svg>
          <NavLink className="ml-2" to="/dashboard">
            Inicio
          </NavLink>
        </li>
        <li className="font-normal mt-2 hover:bg-[#f5f5f5] dark:hover:bg-[#2D2F40] w-full px-4 rounded-sm py-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <circle cx="10" cy="20.5" r="1" />
            <circle cx="18" cy="20.5" r="1" />
            <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
          </svg>
          Ventas
        </li>
        <li className="font-light mt-1 ml-6 hover:bg-[#f0f4f8] dark:hover:bg-[#2D2F40] w-fit px-4 py-2 rounded-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20v-6M6 20V10M18 20V4" />
          </svg>
          <NavLink to="/dashboard/ventas" className="ml-2">
            Ver ventas
          </NavLink>
        </li>
        <li className="font-light mt-1 ml-6 hover:bg-[#f0f4f8] dark:hover:bg-[#2D2F40] w-fit px-4 py-2 rounded-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <NavLink className="ml-2" to="/dashboard/ventas/crear">
            Crear ventas
          </NavLink>
        </li>

        <li className="font-normal mt-2 hover:bg-[#f5f5f5] dark:hover:bg-[#2D2F40] w-full px-4 rounded-sm py-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <circle cx="10" cy="20.5" r="1" />
            <circle cx="18" cy="20.5" r="1" />
            <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
          </svg>
          Productos
        </li>
        <li className="font-light mt-1 ml-6 hover:bg-[#f0f4f8] dark:hover:bg-[#2D2F40] w-fit px-2 py-2 rounded-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20v-6M6 20V10M18 20V4" />
          </svg>
          <NavLink href="/dashboard/productos" className="ml-2">
            Ver productos
          </NavLink>
        </li>
        <li className="font-light mt-1 ml-6 hover:bg-[#f0f4f8] dark:hover:bg-[#2D2F40] w-fit px-2 py-2 rounded-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <NavLink href="/dashboard/productos/crear" className="ml-2">
            Crear productos
          </NavLink>
        </li>

        <li className="font-normal mt-2 hover:bg-[#f5f5f5] dark:hover:bg-[#2D2F40] w-full px-4 rounded-sm py-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M7 15h0M2 9.5h20" />
          </svg>
          Gastos
        </li>
        <li className="font-light mt-1 ml-6 hover:bg-[#f0f4f8] dark:hover:bg-[#2D2F40] w-fit px-4 py-2 rounded-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M12 20v-6M6 20V10M18 20V4" />
          </svg>
          <NavLink href="/dashboard/gastos">Ver gastos</NavLink>
        </li>
        <li className="font-light mt-1 ml-6 hover:bg-[#f0f4f8] dark:hover:bg-[#2D2F40] w-fit px-4 py-2 rounded-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <NavLink href="/dashboard/gastos/crear">Crear gastos</NavLink>
        </li>
        <li className="font-normal mt-2 hover:bg-[#292B50] w-full px-4 rounded-sm py-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
            <line x1="12" y1="2" x2="12" y2="12"></line>
          </svg>
          <NavLink href="/login">Cerrar sesión</NavLink>
        </li>
      </ul>
    </nav>
  );
};
