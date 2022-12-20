import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

import Table from "./Table";
import Settings from "./Settings";
import Select from "./Select"
import B from "./B";
import Delete from "./Delete";
import Update from "./Update";
import CheckboxInput from "./CheckboxInput";
import TreeNode from "./TreeNode";
import { tree } from '../data/dummy';
import '../index.css';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
let stop = 0;
let items = [];



class AA extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      strd: [],
      flagsettings: 0,
      postPerPage: 10,
      flag: 0,
      dff: -1,
      ending: "",
      str: "",
      urls: [
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/comments",
        "https://jsonplaceholder.typicode.com/albums",
        "https://jsonplaceholder.typicode.com/photos",
        "https://jsonplaceholder.typicode.com/todos",
        "https://jsonplaceholder.typicode.com/users"
      ],
      i: 0,
      checked: true,
      icolumn: -1,
      settings: 0,
      change: false,
      changes: [],
      changeall: false
    };
    this.setRec = this.setRec.bind(this);
  }

  furl(i, id, title) {

    let el = {
      id: id,
      title: title
    }
    items.push(el)

    this.setState({ changes: [] });
    let arr = []
    fetch(this.state.urls[i])
      .then((response) => response.json())
      .then((response) => {
        // set the state

        this.setState({
          data: response.map((t) => {
            for (let i = 0; i < items.length; i++)
              if (t.id == items[i].id) t.title = items[i].title;
            arr.push({ id: t.id, checked: false })
            return t;
          })
        });


        this.setState({
          columns: Object.keys(response[0]).map((t) => {

            let d = { col: { name: "", disp: true } };
            d.col.name = null;

            return d;

          }

          )
        })
      });
    this.setState({ changes: arr })

  }
  changeRecits(e) {
    this.setState((i, e) => ({ i: e }))



    this.furl(e);
  }
  m(e) {
    this.setState({
      data: this.props.data.map((t, i) => {
        if (this.props.params.id == i) t.title = this.state.str;
        return t
      })
    })
    stop = 1
  }


  back() {
    window.location.href = window.location.href.slice(0, window.location.href.lastIndexOf("/") + 1)

  }
  checkedCol(checked, index) {


    this.setState((state) => {
      // Important: read `state` instead of `this.state` when updating.
      return {
        icolumn: index,
        checked: checked
      }
    });



  }
  setRec() {
    let v = this.props.params.data;
    let t = v.map((t, i) => {
      if (this.props.params.id == i) t.title = this.props.params.str
      return t
    });
    this.setState({
      settings: 0,
      flag: 1,
      data: t
    });


  }

  setch(i) {
    let arr1 = this.state.changes.map((t) => {
      if (t.id == i)
        t.checked = !t.checked;
      return t
    })
    this.setState({ changes: arr1 });
    let arr = this.state.changes.filter((t) => t.checked)

    if (arr.length >= 1)
      this.setState({ change: true })
    else
      this.setState({ change: false })


  }

  componentDidMount() {


    if (stop == 0) {
      const r = this.props.params.id && this.props.params.f == undefined ? this.props.params.id : this.state.i;
      this.furl(r, 0, "eee");
      this.setState({
        strd: this.state.urls.map((t, i) => (


          (<option value={i}>{t.slice(t.lastIndexOf("/"))}</option>)

        )),
        str: this.props.params.str
      });


    }
  };
  changePPP(value) {
    this.setState({ postPerPage: value })

  };
  allchtrue() {

    this.setState({ changes: this.state.changes.map((t) => { t.checked = "true"; return t }) })
    alert("przed  " + this.state.checkall)

    alert("ffff  " + this.state.checkall)
  }
  allchfalse() {

    this.setState({ changes: this.state.changes.map((t) => { t.checked = null; return t }) })


  }

  render() {
    return (



      <div>
        {this.state.settings == 0 && this.props.params.f == undefined &&

          <div className="LT">
            <div className="TreeNode">
              <TreeNode familyTree={tree.children} id={0} depth={0} />
            </div>
            <div className="LTchild">
              <Link className="a2" to="/a/pagination/settings" onClick={() => this.setState({ settings: 1 })}>settings</Link>




              {this.state.change &&
                <div onClick={this.state.checkall ? this.allchtrue.bind(this) : this.allchfalse.bind(this)}
                  onMouseUp={() => this.setState({ checkall: !this.state.checkall })}>checks</div>}



              <Table i={this.state.i} setch={this.setch.bind(this)} furl={this.furl.bind(this)} data={this.state.data}
                columns={this.state.columns.map((t, i) => {
                  if (i == this.state.icolumn && this.state.checked) t.col.disp = false;
                  else if (i == this.state.icolumn && this.state.checked == false) t.col.disp = true;

                  return t;
                })}
                flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage}
                dff={this.state.dff} changes={this.state.changes} str={this.props.params.str}
              />
            </div>

          </div>
        }



        {this.state.settings == 0 && this.props.params.f == 1 &&
          <div className="LT">
            <div className="TreeNode">
              <TreeNode familyTree={tree.children} id={0} depth={0} />
            </div>


          </div>

        }





        {
          this.state.settings == 1 && <div >

            <div className="LT">
              <div className="TreeNode">
                <TreeNode familyTree={tree.children} id={0} depth={0} />
              </div>
              <div className="LTchild">
                <Settings data={this.state.data} columns={this.state.columns} changePPP={this.changePPP.bind(this)}
                  checkedCol={this.checkedCol.bind(this)}

                  flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage} />
                <Link className="a2" to="/a/pagination" onClick={() => this.setState({ settings: 0 })}>back to main</Link>
                <Link className="a2" to="/a/pagination/url" onClick={() => this.setState({ settings: 2 })}>change database</Link>
                <Table i={this.state.i} data={this.state.data} setch={this.setch.bind(this)}
                  columns={this.state.columns.map((t, i) => {
                    if (i == this.state.icolumn && this.state.checked) t.col.disp = false;
                    else if (i == this.state.icolumn && this.state.checked == false) t.col.disp = true;

                    return t;
                  })}
                  flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage}
                  dff={this.state.dff} changes={this.state.changes} str={this.props.params.str}
                />
              </div>
            </div>
          </div>
        }
        {this.state.settings == 2 &&
          <Select changeRecits={(e) => this.changeRecits(e)} strd={this.state.strd}

          />
        } </div>)
  }
}
export default withParams(AA);