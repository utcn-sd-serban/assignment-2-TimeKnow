import searchModel from '../model/SearchModel'

class SearchManagementPresenter{
    onChangeEvent(property, value){
        searchModel.changeProperty(property, value);
        searchModel.filterSearch();
    }

    onSelectEvent(postId){
        searchModel.clear();
        const url = "#/questions/list/"+postId;
        window.location.assign(url);
    }

    onSearchEvent(){
        searchModel.filterSearch();
        const searchType = searchModel.state.searchType.replace(' ', '+');
        const term = searchModel.state.currentSearch.replace(' ','+');
        const url = "#/questions/query/"+searchType+"/"+term;
        window.location.assign(url);
    }

}

const searchManagementPresenter = new SearchManagementPresenter();

export default searchManagementPresenter;