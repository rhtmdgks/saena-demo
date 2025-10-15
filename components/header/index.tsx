import { NavbarLink, NavbarLinkBackground } from "./link";
import clsx from "clsx";

export const Header = () => {
  const navbarItems = [
    { href: "/waitlist", title: "Waitlist" },
    { href: "/manifesto", title: "Manifesto" },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <nav className="bg-black/40 backdrop-blur-md rounded-full border border-white/20">
        <div
          className={clsx(
            "rounded-full p-1 flex relative items-center"
          )}
        >
          {/* Animated background */}
          <NavbarLinkBackground
            links={navbarItems.map((item) => item.href)}
          />

          {/* Navigation items */}
          {navbarItems.map(({ href, title }) => (
            <NavbarLink key={href} href={href}>
              {title}
            </NavbarLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
