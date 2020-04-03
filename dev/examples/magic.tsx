import * as React from "react"
import { motion, useCycle, SharedMagicMotion } from "@framer"

const styles = [
    {
        width: 100,
        height: 100,
        backgroundColor: "#f00",
        top: 100,
    },
    {
        width: 200,
        height: 200,
        backgroundColor: "#fff",
        opacity: 0.4,
        left: 100,
    },
    {
        width: 100,
        height: 100,
        backgroundColor: "#00f",
        opacity: 1,
        left: "calc(100vw - 100px)",
    },
    {
        width: 200,
        height: 200,
        backgroundColor: "#0f0",
        opacity: 1,
        borderRadius: "100px",
    },
]

/**
 * Issues:
 * - Nested stuff
 * - Animating between borderRadius value type
 */

export const App = () => {
    const [count, cycleCount] = useCycle(0, 1, 2, 3)

    return (
        <motion.div
            style={{ ...styles[count], position: "absolute" }}
            magic
            id={`shape-${count}`}
            onClick={() => cycleCount()}
        />
    )
}
