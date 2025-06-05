import Image from "next/image"
import  Code  from "@/components/code"

export function useMDXComponents(components) {

  return {
    h1: ({ children }) => (
      <h1  className='text-4xl font-bold pb-5' style={{fontFamily:""}}>{children}</h1>
    ),
    img: ({ src, width = '500', height = '500' }) => (
      <img
        src={src}
        width={width}
        height={height}
        style={{ display: 'block', margin: '0 auto' }}
      />
    ),
    // p: ({children, style}) => (
    //   <p style={style} className="text-lg">{children}</p>
    // ),
    li: ({children, style}) => (
      <li style={style} className="text-lg">{children}</li>
    ),
    code:({children})=>{
      // console.log("rbhi", children);
      return (
      <>
      <Code>{children}</Code>
      </>)
    },
    ...components,
  }
}