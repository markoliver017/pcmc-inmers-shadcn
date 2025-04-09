import React from 'react'
import Breadcrumbs from './Breadcrumbs'

export default function WrapperHead() {
    return (
        <div className="flex justify-between items-center p-4  shadow">
            <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-geist-sans)" }}>Page Title</h1>
            <Breadcrumbs />
        </div>
    )
}
