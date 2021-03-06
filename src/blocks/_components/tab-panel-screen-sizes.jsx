import iconMobile from '../_icons/tabs-mobile.svg';
import iconTablet from '../_icons/tabs-tablet.svg';
import iconLaptop from '../_icons/tabs-laptop.svg';
import iconDesktop from '../_icons/tabs-desktop.svg';
import iconTv from '../_icons/tabs-tv.svg';

const { Component } = wp.element;

const { __, sprintf } = wp.i18n;

const { ghostkitVariables } = window;

const {
    Tooltip,
    TabPanel,
} = wp.components;

export default class TabPanelScreenSizes extends Component {
    render() {
        const {
            iconsColor = {},
            activeClass = 'is-active',
            instanceId,
            orientation = 'horizontal',
        } = this.props;

        if ( ! ghostkitVariables || ! ghostkitVariables.media_sizes || ! Object.keys( ghostkitVariables.media_sizes ).length ) {
            return __( 'No media sizes found.' );
        }

        const tabs = [];
        const icons = [
            iconMobile,
            iconTablet,
            iconLaptop,
            iconDesktop,
            iconTv,
        ];

        Object.keys( ghostkitVariables.media_sizes ).forEach( ( mediaName, i ) => {
            tabs.unshift( {
                name: mediaName,
                title: (
                    <Tooltip text={ sprintf( __( 'Devices with screen width <= %s' ), `${ ghostkitVariables.media_sizes[ mediaName ] }px` ) }>
                        <span style={ iconsColor && iconsColor[ mediaName ] ? {
                            color: iconsColor[ mediaName ],
                        } : {} }>
                            { icons[ i ]() }
                        </span>
                    </Tooltip>
                ),
                className: 'ghostkit-control-tabs-tab',
            } );
        } );
        tabs.unshift( {
            name: 'all',
            title: (
                <Tooltip text={ __( 'All devices' ) }>
                    <span>
                        { icons[ icons.length - 1 ]() }
                    </span>
                </Tooltip>
            ),
            className: 'ghostkit-control-tabs-tab',
        } );

        return (
            <TabPanel
                className="ghostkit-control-tabs"
                tabs={ tabs }
                activeClass={ activeClass }
                instanceId={ instanceId }
                orientation={ orientation }
            >
                { this.props.children }
            </TabPanel>
        );
    }
}
