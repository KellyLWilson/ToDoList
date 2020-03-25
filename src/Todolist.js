import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//add a class that does the ToDoList
class ToDoList extends React.Component {
    constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.state = {
        list: '',
        items: [],
        archiveItems: [],
        
      
    };
  }


//local storage life cycle stuff   

async componentDidMount() {
    
//console.log("localStorage is:", storage)

var newList = JSON.parse(localStorage.getItem('items')) || [];


//await window.localStorage.setItem('list', JSON.stringify(this.state.list));

    this.setState(
      {
        items: newList
      }

      
    );
    }

    componentDidUpdate () {
      localStorage.setItem('items', JSON.stringify(this.state.items));
     
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

clearAll (e) {
  e.preventDefault();
  window.localStorage.clear(); 
  this.setState({
      
    list: [],
    items: []
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
          <button onClick={this.clearAll}>Clear All</button>
        </form>
        <Display items={this.state.items} />
      </div>
    );
  }
}
//console.log(items);

//probably and easier way to do this but setting a constant to display 
//the output of the list and then calling it in the export default
let Display = props => (
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


