import fs from 'fs/promises'
import path from 'path'
import { Inter } from 'next/font/google'
import {
  FaAtom,
  FaDivide,
  FaKey,
  FaBalanceScale,
  FaMedal,
  FaSatelliteDish,
  FaTheaterMasks,
} from 'react-icons/fa'
import { AiFillBank } from 'react-icons/ai'
import { HiOutlineDesktopComputer } from 'react-icons/hi'
import { TbLetterD, TbLetterE } from 'react-icons/tb'

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  const [program] = props.program
  const { title, terms, slug } = program
  const icons = {
    key: FaKey,
    gmat: FaDivide,
    tech: HiOutlineDesktopComputer,
    pe: FaMedal,
    elective: TbLetterE,
    gdiv: TbLetterD,
    gcom: FaSatelliteDish,
    ghis: AiFillBank,
    ghum: FaTheaterMasks,
    gscl: FaAtom,
    gsoc: FaBalanceScale,
  }
  return (
    <div className={`${inter.className}`}>
      <header className={`pt-16`}>
        <div className="max-w-screen-xl mx-auto h-0.5 rounded bg-ocean-blue" />
        <h1 className={`text-center text-4xl font-bold py-1 text-ocean-blue`}>
          {title}
        </h1>
        <p className="text-center -mt-2">
          Online Educational Plan - 7.5 Week Sessions
        </p>
      </header>
      <main className={`max-w-screen-xl mx-auto px-4 xl:px-0`}>
        {terms.length > 0 &&
          terms.map((term, i) => (
            <section key={`${slug}-term-${i}`} className={`py-4`}>
              <div className="grid-cols-5 justify-items-center hidden lg:grid">
                <h2 className={`col-span-1 order-3 text-2xl font-bold`}>
                  {term.title}
                </h2>
                <h3
                  className={`col-span-2 order-1 text-lg text-ocean-blue pt-2`}
                >
                  {term.sessions[0].title}
                </h3>
                <h3
                  className={`col-span-2 order-5 text-lg text-ocean-blue pt-2`}
                >
                  {term.sessions[1].title}
                </h3>
              </div>
              <div className="border-2 border-ocean-blue rounded-md">
                <div className="grid lg:grid-cols-2 gap-y-6 lg:gap-y-0 lg:gap-x-10 p-4 md:p-6 lg:p-8">
                  {term.sessions.length > 0 &&
                    term.sessions.map((session, j) => {
                      return (
                        <div
                          key={`${slug}-term-${i}-session-${j}`}
                          className=""
                        >
                          <div>
                            <h3
                              className={`text-lg text-center text-ocean-blue lg:hidden border-b border-ocean-blue`}
                            >
                              {session.title}
                            </h3>
                            <table className={`w-full text-center`}>
                              <thead>
                                <tr className={`sr-only`}>
                                  <th>Key</th>
                                  <th>Course Code</th>
                                  <th>Course Title</th>
                                  <th>Credits</th>
                                </tr>
                              </thead>
                              <tbody>
                                {session.courses.length > 0 &&
                                  session.courses.map((course, k) => {
                                    const Icon = icons[course.icon]
                                    return (
                                      <tr
                                        key={`${slug}-term-${i}-session-${j}-course-${k}`}
                                        className={`border-b`}
                                      >
                                        <td className="w-[5%] py-2">
                                          <Icon />
                                        </td>
                                        <td>{course.code}</td>
                                        <td className="w-[60%]">
                                          {course.title}
                                        </td>
                                        <td className="w-[10%]">{`${course.credits} cr`}</td>
                                      </tr>
                                    )
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </section>
          ))}
      </main>
      <footer>FOOTER</footer>
    </div>
  )
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'programs.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)
  return data
}

export async function getStaticProps({ params }) {
  const data = await getData()
  return {
    props: {
      program: data.programs,
    },
  }
}

export async function getStaticPaths() {
  const data = await getData()
  const slugs = data.programs.map(program => program.slug)
  const params = slugs.map(slug => ({ params: { slug } }))
  return {
    paths: params,
    fallback: false,
  }
}
