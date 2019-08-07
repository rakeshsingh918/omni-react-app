import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import Constants from './main.constants.js';

const categories = [
    {
      id: 'Develop',
      children: [
        { id: 'Data Copy Request', icon: <PeopleIcon />, active: true },
        { id: 'Monitoring', icon: <DnsRoundedIcon /> },
        { id: 'Context Search', icon: <PermMediaOutlinedIcon /> },
        { id: 'Module2', icon: <PublicIcon /> },
        { id: 'Module3', icon: <SettingsEthernetIcon /> },
        { id: 'Module4', icon: <SettingsInputComponentIcon /> },
      ],
    },
    {
      id: 'Quality',
      children: [
        { id: 'Analytics', icon: <SettingsIcon /> },
        { id: 'Performance', icon: <TimerIcon /> },
        { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
      ],
    },
  ];
  



const initialState = {
    categories: [],
    isInvalidTag:false
};
function mainReducer(state = initialState, action) {
    switch(action.type){
        case Constants.DEVELOP_CATEGORY:
            return {
              ...state,
              categories:[categories[0]]}
            break;
            case Constants.QUALITY:
                return {...state,
                    categories:[categories[1]]
                }
                break;
                case Constants.DISABLE_TAG:
                  return {
                    ...state,
                    isInvalidTag:action.payload
                  }
        default:
            return state;
    }
}
export default mainReducer;