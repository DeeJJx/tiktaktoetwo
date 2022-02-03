const Gameboard = (() => {

})();

const Gameflow = (() => {

})();

//All things player based 
const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
}