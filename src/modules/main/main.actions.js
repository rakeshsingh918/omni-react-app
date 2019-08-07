import Constants from './main.constants';
import axios from 'axios'
function initialLoad(){
    return {
        type:Constants.DEVELOP_CATEGORY
    };
}
function loadQualityCategory(){
    return {
        type:Constants.QUALITY
    }
}
export const fetchApiData = () => {
    return (dispatch) => {
    var url = "http://localhost:8080/getAllAIMJob/";
      return axios.get(url)
        .then(response => {
          dispatch({type:Constants.DISABLE_TAG,payload:true});
        })
        .catch(error => {
            dispatch({type:Constants.DISABLE_TAG,payload:true});
        });
    };
  };
export default {
    initialLoad,
    loadQualityCategory,
    fetchApiData
}