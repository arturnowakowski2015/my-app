import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation
} from "react-router-dom";
 
import ProgressBar from "./ProgressBar";
import Table from "./Table";
import Settings from "./Settings";
import Select from "./Select"

import TreeNode from "./TreeNode";
import Update from "./Update";

 
import { tree } from '../data/dummy';
import '../index.css';
 
import UserContext from "../ctx/User";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
let stop = 0;
let items = [];
let y = [];
let arr = []
let config = 0;
let w = [];
let ii = 0;
let act = ""
let kk = 0;
class AA extends React.Component {

  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      data: { new: [], selected: [], opened: [], removed: [], labels: [] },
      columns: [],
      strd: [],
      flagsettings: 0,
      postPerPage: 10,
      flag: 0,
      dff: -1,
      ending: "",
      str: "sssss",
      urls: [
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/comments",
        "https://jsonplaceholder.typicode.com/albums",
        "https://jsonplaceholder.typicode.com/photos",
        "https://jsonplaceholder.typicode.com/todos",
      ],
      i: 0,
      number1: 0,
      checked: true,
      icolumn: -1,
      settings: 0,
      change: false,
      changes: [],
      changeall: false,
      checkall: true,
      config: 0,
      categories: { actual: [{ cat: "new", l: 0 }], new: [], set: ["new", "selected", "postponed", "removed"] },
      parent: "",
      strcol: "",
      w: [],
      m:0



    };
    this.setRec = this.setRec.bind(this);
    this.df = this.df.bind(this)
  }
  df(i, el) {

  }


  furl(settingsid, idrec, bazaid, tryb, upstr, str) {
    this.setState({ strcol: str })
    this.setState({ i: bazaid })


    this.setState({ settings: settingsid });

    this.setState({ changes: [] });


    fetch(this.state.urls[bazaid])
      .then((response) => response.json())
      .then((response) => {
        // set the state 
        if (this.state.data[this.state.categories.actual[0].cat].length == 0)
          this.state.data[this.state.categories.actual[0].cat] = response.filter((t, i) => {
            return i<50 && t;
          })
        this.setState({ data: this.state.data })
        this.state.data["postponed"] = response.filter((t, i) => {
          return i>50 && i<100 && t;
        })
      this.setState({ data: this.state.data })


      this.state.data["removed"] = response.filter((t, i) => {
        return i>100 && i<150 && t;
      })
    this.setState({ data: this.state.data })


        this.state.categories.actual[0].l = response.length
        this.setState({ categories: this.state.categories })
        this.setState({
          columns: Object.keys(response[0]).map((t, i) => {

            let d = { col: { title: "", disp: true } };
            d.col.title = null;

            return d;

          }

          )
        })





      });

    this.state.data[this.state.categories.actual[0].cat].map((tt) => {

      if (tt.id == idrec) tt[str] = upstr;
    })

    this.setState({ changes: arr })


  }
  changem(i){
    this.setState({m:i})
  }
  changeRecits(e, p) {

    this.setState({ i: e })



    this.furl(0, 0, e, "u", "");
  }
  m(e) {
    this.setState({
      data: [this.state.categories[0]] = this.props.data.map((t, i) => {

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
      data: [this.state.categories[0]] = t
    });


  }



  componentDidMount() {


    if (stop == 0) {
      const r = this.props.params.id && this.props.params.f == undefined ? this.props.params.id : this.state.i;

      this.furl(this.state.settings, null, 1, "u", "dd d");

      this.setState({
        strd: this.state.urls.map((t, i) => (


          (<option key={i} value={i}>{t.slice(t.lastIndexOf("/"))}</option>)

        )),
        str: this.props.params.str
      });


    }
  };
  changePPP(value) {
    this.setState({ postPerPage: value })
    

  };

  setcategories(category, actstr) {
    let obj2 = this.state.data[this.state.categories.actual[0].cat]
    let obj = null
    let el = 0;

    if (this.state.categories.actual[0].cat != category) {
      obj = this.state.categories.new.filter((t) => t.cat != category)
      if (obj.length == 0) {
        el = { cat: this.state.categories.actual[0].cat, l: this.state.data[this.state.categories.actual[0].cat].length };
        this.state.categories.new = [el]
      } else {
        el = { cat: this.state.categories.actual[0].cat, l: this.state.data[this.state.categories.actual[0].cat].length };
        this.state.categories.new = [...obj, el]
      }
      if (this.state.categories.new.filter((t) => t.cat == category).length == 0) {

        this.state.categories.actual[0].cat = category;
        this.state.categories.actual[0].l = this.state.data[category].length
      }

    }

 
    return this.setState({ actual: this.state.categories.actual });


  }
  reset() {

    Object.keys(this.state.data).map((t) => { this.state.data[t] = []; this.setState({ data: this.state.data }) })
    this.state.categories.new = [];
    this.setState({ categories: this.state.categories })

  }

  changedata(category, flag, flag1) {alert(category+":"+flag+":"+flag1)
    if (flag1 == 1 || flag1 == 2) {

      this.state.categories.new[0] = category;
      this.setState({ categories: this.state.categories })
    }

    let y2 = 0;
    let stop = 0;
    if (flag == 0 && this.state.data[category] ? this.state.data[category].length : "") {


      let l = this.state.data[category] ? this.state.data[category].length : 0;

      this.setcategories(category, this.state.categories.actual[0].cat)
      stop = 1;


    }
    if (flag == 2) {
      if (this.state.data[category] || this.state.categories.actual[0].cat != category) {



        if (this.state.data[category] == undefined || this.state.data[category] == "")
          this.state.data[category] = this.state.data[this.state.categories.actual[0].cat]

        let arr1 = arr.filter((t) => t != "")
 
        if (arr1.length != this.state.data[category].length) {
          y = this.state.data[category].filter(f => arr.some(item => item.id === f.id))
          y2 = this.state.data[category].filter(f => !arr.some(item => item.id === f.id))
        }
        else {
          y = this.state.data[category].filter(f => arr1.some(item => item.id === f.id && item.checked == true))
          y2 = this.state.data[category].filter(f => arr1.some(item => item.id === f.id && item.checked == false))
        }
        this.state.data[this.state.categories.actual[0].cat] = y2
        this.state.categories.actual[0].l = y2.length
        this.state.categories.new = [...this.state.categories.new, { cat: category, l: y.length }]
        //this.state.data[category] = y
        this.state.data[category] = [... this.state.data[category], y]
        this.setcategories(category, this.state.categories.actual[0].cat)
        // this.state.categories.actual[0].cat = category
      }
    } else if (flag == 0 && this.state.data[category] && this.state.data[category].length && stop == 0) {

      this.state.data[this.state.categories.actual[0].cat] =  this.state.data[category].filter(f => !arr.some(item => item.id === f.id))
      this.state.categories.actual[0].l = this.state.data[category].length
      this.state.categories.actual[0].cat = category;
      this.setcategories(category, this.state.categories.actual[0].cat)

    }
    else alert("   no records !!");





  }



  changeparent(name) {
    this.setState({ parent: name })
  }

  render() {




    let change = false;
    const [count, updateCount] = this.context;
    arr = count.map((t) => t)
    function setch(i, r) {


      let arr = count.filter((t) => t.checked)

      if (arr.length >= 1)
        change = true;
      else
        change = false;


    }

    function allchtrue() {

      count = count.map((t) => { t.checked = "true"; return t })
    }

    function allchfalse() {

      count = count.map((t) => { t.checked = null; return t })
    }
 

    return (
      <div> 

        {this.state.settings == 0 && this.props.params.f == undefined &&

          <div className="LT">

            <div className="LTchild">
              {arr.length == 0 && <Link className="a2" to={"/a/" + this.state.categories.actual[0].cat + "/pagination/settings"} onClick={() => {
                this.setState({ config: 1 });
                this.setState({ settings: 1 })
                this.setState({ number1: 1 })
              }}>settings</Link>
              }
              {arr.length > 0 &&
                <div>
 
                </div>
              }



            </div>

          </div>
        }



        {this.state.settings == 3 &&
          <div className="LT">
            <div className="TreeNode">
              <Update i={this.state.i} furl={this.furl.bind(this)} acturl={this.state.categories.actual[0].cat}
                strcol={this.state.strcol} />

            </div>


          </div>

        }





        {
          this.state.settings == 1 &&

          <div className="LT select">


            <Settings data={this.state.data} columns={this.state.columns} changePPP={this.changePPP.bind(this)}
              checkedCol={this.checkedCol.bind(this)}
              length={this.state.data[this.state.categories.actual[0].cat].length}
              flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage}
              number2={(o) => this.setState({ number1: o })}
            />
            <Link className="a2" to={"/a/" + this.state.categories.actual[0].cat + "/pagination"} onClick={() => {
              this.setState({ settings: 0 });
              this.setState({ config: 0 })
            }}>back to main</Link>
            <Link className="a2 select" to={"/a/" + this.state.categories.actual[0].cat + "/pagination/url"} onClick={() => this.setState({ settings: 2 })}>change database</Link>

            <div className="border"></div>





          </div>

        }

        {this.state.settings == 2 &&
          <div className="select">
            <Select acturl={this.state.categories.actual[0].cat} changeconfig={(i) => { this.setState({ config: i }) }}
              changecategory={(category, flag, flag1) => {
                this.changedata(category, flag, flag1);
                arr = count.map((t) => t.checked = false)
                updateCount("", 0, 3)
              }} changeRecits={this.changeRecits.bind(this)} strd={this.state.strd}
              reset={this.reset.bind(this)}

            />
          </div>
        }
        <div className="LTchild">
          <div className="treeNode">
            <TreeNode changeintree={(category, flag, flag1) => {  this.changedata(category, flag, flag1); updateCount("", 0, 3) }}
              changeparent={(name) => this.setState({ parent: name })}
              config={this.state.config}
              familyTree={tree.children}
              changeconfig={(i) => { this.setState({ config: i }) }}
              settings={this.state.settings}
              ac={this.state.categories.set}
              pc={this.state.data} id={0} depth={0} p={0} pdepth={-1} pid={0}

              parent={this.state.parent} />
          </div>
          <Table i={this.state.i} data={this.state.data[this.state.categories.actual[0].cat]} setch={() => setch()} familyTree={tree.children}
            columns={this.state.columns.map((t, i) => {
              if (i == this.state.icolumn && this.state.checked) t.col.disp = false;
              else if (i == this.state.icolumn && this.state.checked == false) t.col.disp = true;

              return t;
            })}
            flagsettings={this.state.flagsettings} postPerPage={this.state.postPerPage}
            dff={this.state.dff} str={this.props.params.str}
            items={items} furl={this.furl.bind(this)} id={this.state.i} flag={this.state.flag} settingsid={this.state.settings}
            acturl={this.state.categories.actual[0].cat}
            number1={this.state.number1}
            m={this.state.m}
            changem={this.changem.bind(this)}
            ChangePage={this.changePPP.bind(this)}
          />

        </div>
      </div >)
  }
}

export default withParams(AA);