import sizes from './sizes';
import background from './bg.svg'

export default {
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'scroll',

        /* Background by SVGBackgrounds.com */
        backgroundColor: '#330055',
        backgroundImage: `url(${background})`
    },
    heading: {
        fontSize: '2rem'
    },
    container: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [sizes.down('xl')]: {
            width: '80%'
        },
        [sizes.down('xs')]: {
            width: '75%'
        }
    },
    nav: {
        color: 'white',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& a': {
            color: 'white'
        }
    }, 
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '2.5rem',
        [sizes.down('md')]: {
            gridTemplateColumns: 'repeat(2, 50%)',
        },
        [sizes.down('xs')]: {
            gridTemplateColumns: 'repeat(1, 100%)',
            gridGap: '1rem'
        }
    }
}