import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaStackOverflow,
  FaCode,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

export function Content({ children, className = "", style }) {
  return (
    <>
      <div
        className={
          "flex flex-wrap w-full lg:pl-65 lg:pr-65  text-xl " + className
        }
        style={style}
      >
        {children}
      </div>
    </>
  );
} // export function Text({ variations = [], children, styles, className}) { const appliedClasses = [ variations.includes("bold") ? "font-bold" : "", variations.includes("italic") ? "italic" : "", ] .filter(Boolean) .join(" ");
//     return <p className={className+" "+appliedClasses} style={styles}>{children}</p>;
// }

export function Text({
  size = "md",
  variations = [],
  children,
  styles,
  className,
}) {
  const validSizes = ["xs", "sm", "md", "lg", "xl"];

  if (!validSizes.includes(size)) {
    return <p className="text-red-500">Size not correctly defined.</p>;
  }

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base", // Default size
    lg: "text-lg",
    xl: "text-xl",
  };

  const appliedClasses = [
    sizeClasses[size],
    variations.includes("bold") ? "font-bold" : "",
    variations.includes("italic") ? "italic" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <p
      className={className + " " + appliedClasses + " mer wrap-break-word"}
      style={styles}
    >
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <>
      <footer className="h-[250px] mt-10 w-full bg-[var(--background-muted)] border-t border-gray-400 dark:border-gray-600">
        <Content className="flex w-[70%] flex-col h-full items-center justify-around md:justify-between md:flex-row w-auto gap-y-10 md:pl-10 md:pr-10">
          <div className="h-auto">
            baltej.posts
            <Text size="sm" className="opacity-75">
              © {new Date().getFullYear()} posts.baltej.me. All rights
              reserved.
            </Text>
            <div className="mt-4">
              <a
                href="https://www.linkedin.com/in/baltej-singh-7789b4313/"
                className="text-sm text-gray-400 hover:underline"
              >
                Contact Me
              </a>
            </div>
          </div>
          <div className="w-max h-auto">
            <div className="flex space-x-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/baltej_223/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition duration-300 transform hover:scale-110 transition duration-300"
              >
                <FaInstagram size={24} />
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com/Baltej_223"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition duration-300 transform hover:scale-110 transition duration-300"
              >
                <FaTwitter size={24} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/baltej-singh-7789b4313"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition duration-300 transform hover:scale-110 transition duration-300"
              >
                <FaLinkedin size={24} />
              </a>

              {/* Stack Overflow */}
              <a
                href="https://stackoverflow.com/users/18618367/baltej-singh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition duration-300 transform hover:scale-110 transition duration-300"
              >
                <FaStackOverflow size={24} />
              </a>

              {/* LeetCode */}
              <a
                href="https://leetcode.com/baltej_singh/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-500 transition duration-300 transform hover:scale-110 transition duration-300"
              >
                <FaCode size={24} />
              </a>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@baltejsingh21"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition duration-300 transform hover:scale-110 transition duration-300"
              >
                <FaYoutube size={24} />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/baltej223"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-800 transition duration-300 transform hover:scale-110 transition duration-300"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </Content>
      </footer>
    </>
  );
}
