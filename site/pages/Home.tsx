import React, { useState } from "react"
import { getSvgsFromLogString } from "../../lib"

export default function Home() {
  const [input, setInput] = useState("")
  const [graphics, setGraphics] = useState<Array<{ title: string; svg: string }>>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const results = getSvgsFromLogString(input)
    setGraphics(results)
  }

  return (
    <div className="space-y-8">
      <div className="prose">
        <h1>Graphics Debug Viewer</h1>
        <p>Paste your debug output below to visualize graphics objects.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-48 p-4 border rounded-lg shadow-sm"
          placeholder="Paste your graphics debug output here..."
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Visualize
          </button>
          <button
            type="button"
            onClick={() => {
              setInput(`:graphics {"title":"Example Usage","rects":[{"center":{"x":0,"y":0},"width":100,"height":100,"color":"green"}],"points":[{"x":50,"y":50,"color":"red","label":"Test Output!"}]} :graphics {"title":"More Example Usage","lines":[{"points":[{"x":0,"y":0},{"x":5,"y":5}]}],"circles":[{"center":{"x":2.5,"y":2.5},"radius":2.5,"color":"blue"}],"points":[{"x":10,"y":10,"color":"red","label":"B"}]}`)
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            See Example
          </button>
        </div>
      </form>

      {graphics.length > 0 && (
        <div className="space-y-8">
          {graphics.map(({ title, svg }, index) => (
            <div key={index} className="space-y-2">
              <h2 className="text-xl font-semibold">{title}</h2>
              <div
                className="border rounded p-4 bg-white"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
