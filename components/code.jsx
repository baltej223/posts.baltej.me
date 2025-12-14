"use client";
import { useRef, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import "highlight.js/styles/night-owl.css";
import hljs from "highlight.js";

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

export default function Code({
  className,
  style,
  children,
  lang = "Javascript",
  whitespace = "                ",
}) {
  let code = children.split("\n");
  if (code.length == 1) {
    return (
      <span
        className="bg-zinc-700 rounded p-[1px]"
        style={{ fontFamily: "monospace" }}
      >
        {code[0]}
      </span>
    );
  } else {
    const isSeqOfWhiteSpaces = (_lang) => {
      let arr = _lang.split("");
      let counter = 0;
      arr.forEach((element)=>{
        if (element = " ") counter++;
      });
      if (counter == arr.length){
        return true;
      } else {
        return false;
      }
    }

    let code = children.split("\n");
    console.log(children);
    let _lang = code[0];
    // console.log(_lang);
    if (!isSeqOfWhiteSpaces(_lang)){
      lang=_lang;
    }
  }
  {
    /* function popEverySecondElement(arr) {
    for (let i = arr.length - 1; i >= 0; i -= 2) {
      arr.splice(i, 1);
    }
    return arr;
  }
  popEverySecondElement(code);
  */
  }

  {
    /*
  if (whitespace == undefined) {
    let numberOfWhiteSpaces = [];
    code.forEach((line, index) => {
      numberOfWhiteSpaces[index] = line.search(/\S/);
    });
    function mode(arr) {
      const freq = arr.reduce(
        (acc, num) => ((acc[num] = (acc[num] || 0) + 1), acc),
        {},
      );
      const maxFreq = Math.max(...Object.values(freq));
      return Object.keys(freq)
        .filter((key) => freq[key] === maxFreq)
        .map(Number);
    }

    let mode_of_whiteSpaces = mode(numberOfWhiteSpaces);
    //genrating mode_of_whitespaces Number whitespaces
    whitespace = " ".repeat(mode_of_whiteSpaces);
    console.log(
      "for children %s, whitespace is %s",
      children,
      whitespace.length,
    );
  }*/
  }

  const HighlightCode = ({ line, lang = "javascript" }) => {
    const codeRef = useRef(null);

    useEffect(() => {
      if (codeRef.current) {
        hljs.highlightElement(codeRef.current);
      }
    }, [line, lang]);

    return (
      <pre className="overflow-x-auto w-full">
        <code ref={codeRef} className="whitespace-pre">
          {/* {whitespace ? line.replace(whitespace, "") : line}*/}
          {line}
        </code>
      </pre>
    );
  };
  let copyRef = useRef();
  let checkRef = useRef();
  return (
    <div
      className={`flex flex-col w-[100%] scrollable pt-5 pb-3 ${className ? className : ""}`}
      style={style ? style : {}}
    >
      <div className="bg-[#011627] w-full  border border-gray-600 rounded">
        <div className="flex flex-row pl-10 pt-3 pb-3 pr-10 bg-[#424242] opacity-70">
          <Text className="text-white monospace opacity-[2] w-[99%] select-none">
            {lang}
          </Text>
          <div className="flex items-center justify-center border-1 border-gray-300 w-6 h-6 rounded">
            <Copy
              ref={copyRef}
              color="white"
              className="w-4 h-4"
              onClick={() => {
                navigator.clipboard
                  .writeText(children)
                  .then(() => {
                    copyRef.current.setAttribute("class", "w-4 h-4 hidden");
                    checkRef.current.setAttribute("class", "w-4 h-4 block");
                    setTimeout(() => {
                      copyRef.current.setAttribute("class", "w-4 h-4 block");
                      checkRef.current.setAttribute("class", "w-4 h-4 hidden");
                    }, 1000);
                  })
                  .catch((err) => {
                    console.error("Failed to copy text to clipboard:", err);
                  });
              }}
            />
            <Check className="w-4 h-4 hidden" color="white" ref={checkRef} />
          </div>
        </div>
        <hr className="text-zinc-800" />

        {/* Scrollable Code Block */}
        <div className="pt-5 pb-5 pl-5 overflow-x-auto w-full">
          <div className="monospace flex flex-col text-sm w-full">
            {code.map((line, index) => (
              <div className="flex flex-row" key={index}>
                {/* Line Number */}
                <div className="pr-5 text-white monospace select-none">
                  {index + 1}
                </div>
                {/* Code Line */}
                <div className="monospace pl-0 pr-5 flex flex-col gap-y-5 text-white">
                  <HighlightCode line={line} lang={lang} cl />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
