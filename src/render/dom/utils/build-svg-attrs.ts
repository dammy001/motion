import { SVGMutableState, DOMVisualElementOptions } from "../types"
import { buildHTMLStyles } from "./build-html-styles"
import { Projection, ResolvedValues } from "../../types"
import { calcSVGTransformOrigin } from "./svg-transform-origin"
import { buildSVGPath } from "./svg-path"

const unmeasured = { x: 0, y: 0, width: 0, height: 0 }

/**
 * Build SVG visual attrbutes, like cx and style.transform
 */
export function buildSVGAttrs(
    state: SVGMutableState,
    {
        attrX,
        attrY,
        originX,
        originY,
        pathLength,
        pathSpacing = 1,
        pathOffset = 0,
        // This is object creation, which we try to avoid per-frame.
        ...latest
    }: ResolvedValues,
    projection: Projection,
    options: DOMVisualElementOptions
) {
    buildHTMLStyles(state, latest, projection, options)

    const { attrs, dimensions, style, totalPathLength } = state

    /**
     * However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
     * and copy it into style.
     */
    if (attrs.transform) {
        style.transform = attrs.transform
        delete attrs.transform
    }

    // Parse transformOrigin
    if (originX !== undefined || originY !== undefined || style.transform) {
        style.transformOrigin = calcSVGTransformOrigin(
            dimensions || unmeasured,
            originX !== undefined ? originX : 0.5,
            originY !== undefined ? originY : 0.5
        )
    }

    // Treat x/y not as shortcuts but as actual attributes
    if (attrX !== undefined) attrs.x = attrX
    if (attrY !== undefined) attrs.y = attrY

    // Build SVG path if one has been measured
    if (totalPathLength !== undefined && pathLength !== undefined) {
        buildSVGPath(
            attrs,
            totalPathLength,
            pathLength as number,
            pathSpacing as number,
            pathOffset as number,
            false
        )
    }
}
