import WithTransition       from './withTransition'
import WithWebAnimation     from './withWebAnimation'

export default {
    WithTransition,
    WithWebAnimation,
    best : () => 'undefined' != typeof Animation ? WithWebAnimation : WithTransition
}
