import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//add a class that does the ToDoList
class ToDoList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        list: '',
        items: [],
      
    };
  }


//local storage life cycle stuff   
//something is still off because it shows in local storage but it doesn't stay if I 
//refresh
async componentDidMount() {
    
//const storage = window.localStorage
//window.localStorage.setItem('myCat:', 'Tom');
//console.log("localStorage is:", storage)

var newList = JSON.parse(localStorage.getItem('stuff')) || [];


//await window.localStorage.setItem('list', JSON.stringify(this.state.list));

    this.setState(
      {
        stuff: newList
      }
      
    );
    }

    componentDidUpdate () {
      localStorage.setItem('stuff', JSON.stringify(this.state.items));
      //I think I need to send stuff to items.....array.push?
    }
  

//I'm sure setting state 100 times.....I should look into this
  onChange = (event) => {
    this.setState({ list: event.target.value });
  }


  //form 
  onSubmit = (event) => {
    event.preventDefault();


    this.setState({
      
      list: [],
      items: [...this.state.items, this.state.list]
    });
  }

  //stuff I tried first for local storage
// saveToLocal = () => {
//     const list = this.state.list;
//     const items = this.state.items;
//     window.localStorage.setItem("list", JSON.stringify(list));
//     window.localStorage.setItem("items", JSON.stringify(items));
//    }

// ***Kelly To-Do***
//finish the local storage stuffs
//add strikethrough or checkboxes to remove item, delete item
//add a button to clear all
//add an archive array to keep all the items




  render() {
    return ( 
      <div>
      <div>
          <h2>To Do List</h2>
          
      </div>
        <form className="To Do List" onSubmit={this.onSubmit}>
          <input value={this.state.list} onChange={this.onChange} />
          <button>Submit</button>
        </form>
        <Display items={this.state.items} />
      </div>
    );
  }
}
//console.log(items);

//probably and easier way to do this but setting a constant to display 
//the output of the list and then calling it in the export default
const Display = props => (
    <div className="border">
    <ul>
      {
        props.items.map((item, index) => <li key={index}>{item}</li>)
      }
    </ul>
    </div>
  );
  
  export default Display;




ReactDOM.render(
    <ToDoList />,
    document.getElementById('root')
  );


