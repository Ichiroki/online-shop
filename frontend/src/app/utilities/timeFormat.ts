import {formatDistanceToNow} from 'date-fns'

const diffForHumans = (data) => {
    return formatDistanceToNow(new Date(data), {addSuffix: true})
}

export default diffForHumans