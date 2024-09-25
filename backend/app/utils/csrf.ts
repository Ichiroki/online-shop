import crypto from 'crypto'

const csrf = () => {
    return crypto.randomBytes(32).toString('hex')
}

export default csrf
