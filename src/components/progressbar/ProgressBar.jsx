import './ProgressBar.css'

export default function ProgressBar({
        progress,
        title = '',
        color = '#4CAF50',
        height = 20,
        isAnimated = true,
        showPercentage = true}) {

    const normalizedProgress = Math.min(100, Math.max(0, progress));

    return (
        <div className="progress-bar-container">

            {(title || showPercentage) && (
                <div className="progress-bar-header">
                    {title && <span className="progress-label">{label}</span>}
                    {showPercentage && (
                        <span className="progress-percentage">{normalizedProgress}%</span>
                    )}
                </div>
            )}

            <div className="progress-bar-outer"
                style={{
                height: `${height}px`,
                backgroundColor: '#f0f0f0',
                borderRadius: '10px',
                overflow: 'hidden'
            }}>
                <div className={`progress-bar-inner ${isAnimated ? 'animated' : ''}`}
                    style={{
                    width: `${normalizedProgress}%`,
                    backgroundColor: color,
                    height: '100%',
                    transition: isAnimated ? 'width 0.5s ease-in-out' : 'none',
                    borderRadius: '10px'}}/>
            </div>
        </div>
    );
}
