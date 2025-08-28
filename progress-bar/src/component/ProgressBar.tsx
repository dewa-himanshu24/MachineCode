import { useEffect, useState } from "react"

interface ProgressBar {
  progress: number
}

const ProgressBar = ({ progress } : ProgressBar) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(()=> {
    setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)
  },[progress])

  return (
    <div className='progress-container'>
    <div className="progress-outer">
      <div className="progress-inner" 
        style={{
        // width: `${animatedProgress}%`,
        transform: `translateX(${animatedProgress - 100}%)`,
        backgroundColor: '#3fad3f',
        }}
        role='progressbar'
        aria-valuenow={progress}
        aria-valuemax={100}
        aria-valuemin={0}
      ><span>{animatedProgress}%</span></div>
    </div>
    </div>
  )
}

export default ProgressBar