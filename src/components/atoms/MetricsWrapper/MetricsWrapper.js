import './MetricsWrapper.scss'

function MetricsWrapper(props){
    const classes = 'metrics-wrapper ' + props.className;
        return <div className={classes}>{props.children}</div>
    }
    export default MetricsWrapper
    