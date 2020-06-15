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
    this.deleteItem = this.deleteItem.bind(this);
    this.checkBoxed = this.checkBoxed.bind(this);
    this.setView = this.setView.bind(this);
    //this.checkHandler = this.checkHandler.bind(this)
    this.state = {
      list: '',
      items: [],
      view: 'inprogress',
      title: 'To-do'
    };
  }

  setView(e) {
    e.preventDefault()

    let tempView = 'all'
    let tempTitle = 'To-do'

    if (e.target.id === "done") {
      tempView = "done"
      tempTitle = "Done"
    }
    else if (e.target.id === "inprogress") {
      tempView = "inprogress"
      tempTitle = "To-do"
    }
    else if (e.target.id === "all") {
      tempView = "all"
      tempTitle = "All items"
    }
    this.setState({
      view: tempView,
      title: tempTitle
    })
  }


  checkBoxed(e) {

    //get id of item I am checking e.target.id
    // add items id to input element
    // e.target.checked    true / false
    // parent - that manages state loop through items in 
    //state check for item id and set it's status to checked which is true or false
    console.log(e)
  }


  // this.setState({
  //   items: newArr.filter(item =>  (item.checked === ))
  // })





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

  componentDidUpdate() {
    localStorage.setItem('items', JSON.stringify(this.state.items));
    //list: window.localStorage.setItem("list", JSON.stringify(list));
    //items: window.localStorage.setItem("items", JSON.stringify(items));
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

  clearAll(e) {
    e.preventDefault();
    window.localStorage.clear();
    this.setState({

      list: [],
      items: []
    });

  }

  // addItem() {
  //   if (this.state.text.slice() !== '') {
  //     const text = {
  //       id: Date.now(),
  //       value: this.state.text.slice(),
  //       checked: false,
  //     };
  //     const list = [...this.state.list]

  //     list.push(text);

  //     this.setState({
  //       list,
  //       text: "",
  //       total: this.state.list.length + 1,
  //     })
  //   }
  //   }

  deleteItem() {


    localStorage.removeItem('items');

    //   deleteItem(id) {
    //     this.setState({
    //         todo: this.state.items.filter(el => el !== id)
    //     })
  }

  //var filteredItems = this.state.items.filter(function (item) {
  //     return (item.key !== key);
  //   });
  // }

  // const list = [...this.state.list]
  // //const updateList = [] 
  // list.map(item => {

  //   if (item.id !== id) {
  //   //updatedList.push(item)
  //  }
  // })

  // this.setState({
  //   //    list: updatedList,
  //   total: this.state.list.length - 1,
  // })
  // window.localStorage.setItem('list', JSON.stringify)
  // };

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

  // checkHandler = id => {
  //   this.setState ({
  //     items: this.state.items.map (items => {
  //       if (items.id === id) {
  //         items.checked = !items.checked;
  //       }
  //       return items;
  //     }),
  //   });
  // };



  render() {

    let tempView = this.state.items;

    if(this.state.view === "inprogress") {
      tempView = this.state.items.filter(item => item.check === false);
    } else if (this.state.view === "done") {
      tempView = this.state.items.filter(item => item.checked === true);
    } else if (this.state.view === "all") {
      tempView = this.state.items;
    }


    return (
      <div>
        <div>
          <h2>To Do List</h2>

          <button className="bg-info">All</button>

          <button className="bg-info">Completed</button>
          <button className="bg-info">In Progress</button>


        </div>
        <form className="To Do List" onSubmit={this.onSubmit}>
          <input value={this.state.list} onChange={this.onChange} />
          <button className="bg-success">Submit</button>


          <span ><Display items={this.state.items} /></span>
          <button className="bg-warning" onClick={this.deleteItem}>Delete</button>
          <button className="bg-danger" onClick={this.clearAll}>Clear All</button>
        </form>
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
        props.items.map((item, index) =>
         {return(<li key={index}>{item} 
         <input type="checkbox"  aria-label="Checkbox for following text input"></input>
         </li>)}
         )
      }

    </ul>
  </div>
);

export default Display;




ReactDOM.render(
  <ToDoList />,
  document.getElementById('root')
);

//<input type="checkbox" onChange={this.checkBoxed} aria-label="Checkbox for following text input"></input>
         //</li>)}
