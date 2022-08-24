import React from 'react'

import { default as SlickSlider } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './Slider.scss'

function Slider({ settings, children }) {
    return <SlickSlider {...settings}>{children}</SlickSlider>
}

export default Slider
