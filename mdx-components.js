import Image from "next/image"
import  Code  from "@/components/code"

export function useMDXComponents(components) {

  return {
    h1: ({ children }) => (
      <h1  className='text-4xl font-bold pb-5' style={{fontFamily:""}}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h1  className='text-3xl font-bold pb-5' style={{fontFamily:""}}>{children}</h1>
    ),
    h3: ({ children }) => (
      <h1  className='text-2xl font-bold pb-5' style={{fontFamily:""}}>{children}</h1>
    ),
    img: ({ src, width = '500', height = '500' }) => {
      return <>
      <br/>
      <img
        src={src}
        width={width}
        height={height}
        style={{ display: 'block', margin: '0 auto' }}
      />
      <br/>
      </>
    },
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
    hr:()=>{
      return <hr className="mt-10 mb-10 opacity-[60%] rounded bg-zinc-800" />
    },
    ...components,
  }
}