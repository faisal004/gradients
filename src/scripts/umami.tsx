'use client'

import Script from "next/script"

const Umami = () => {
    return (
        <Script
         defer src="https://cloud.umami.is/script.js" data-website-id={process.env.NEXT_ANALYTICS_TOKEN}
        />
    )
}

export default Umami