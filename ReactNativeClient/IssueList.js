import React from 'react';

import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://10.0.2.2:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <>
        {/****** Q1: Start Coding here. ******/}
        <View>
          <Text>Placeholder for filter</Text>
        </View>
        {/****** Q1: Code ends here ******/}
        </>
      );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 8, paddingTop: 30 },
  header: {height: 50, backgroundColor: '#537791', paddingTop:10, paddingLeft:6, backgroundColor: "lavenderblush"},
  text: { textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "azure" }
  });

const navStyles = StyleSheet.create({
    nav: {
      width: 78,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      cornerRadius: 5,
    },
    navText: {
      fontSize: 17,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: 'brown',
      padding: 5,
    },
  });


const width= [30,60,60,60,60,60,80];

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    const created = issue.created ? (issue.created instanceof Date ? issue.created.toString() : new Date(issue.created).toString()) : "";
    const due = issue.due ? (issue.due instanceof Date ? issue.due.toString() : new Date(issue.due).toString()) : "";
    const row = <View style={[{ flexDirection: 'row' },styles.row,styles.dataWrapper,styles.text]}>
    <Text style={[{ width: width[0] }]}>{issue.id}</Text>
    <Text style={[{ width: width[1] }]}>{issue.title}</Text>
    <Text style={[{ width: width[2] }]}>{issue.status}</Text>
    <Text style={[{ width: width[3] }]}>{issue.owner}</Text>
    <Text style={[{ width: width[4] }]}>{issue.effort}</Text>
    <Text style={[{ width: width[5] }]}>{created}</Text>
    <Text style={[{ width: width[6] }]}>{due}</Text>
    </View>;
    {/****** Q2: Coding Ends here.******/}
    return (
      <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      {row}
      {/****** Q2: Coding Ends here. ******/}
      </>
    );
  }
  
  
  function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    const issueHeader = <View style={[{ flexDirection: 'row' },styles.header,styles.dataWrapper,styles.text]}>
    <Text style={[{ width: width[0], fontWeight:"bold" }]}>ID</Text>
    <Text style={[{ width: width[1], fontWeight:"bold" }]}>Title</Text>
    <Text style={[{ width: width[2], fontWeight:"bold" }]}>Status</Text>
    <Text style={[{ width: width[3], fontWeight:"bold" }]}>Owner</Text>
    <Text style={[{ width: width[4], fontWeight:"bold" }]}>Effort</Text>
    <Text style={[{ width: width[5], fontWeight:"bold" }]}>Created</Text>
    <Text style={[{ width: width[6], fontWeight:"bold" }]}>Due</Text>
    </View>;
    {/****** Q2: Coding Ends here. ******/}
    return (
    <View style={styles.container}>
    {/****** Q2: Start Coding here to render the table header/rows.**********/}
    {issueHeader}
    {issueRows}
    {/****** Q2: Coding Ends here. ******/}
    </View>
    );
  }

  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Start Coding here. Create State to hold inputs******/
      this.state = {Title: '', Status: "New", Owner: '', Effort: '', Due: ''};
      this.setTitle = this.setTitle.bind(this);
      this.setStatus = this.setStatus.bind(this);
      this.setOwner = this.setOwner.bind(this);
      this.setEffort = this.setEffort.bind(this);
      this.setDue = this.setDue.bind(this);
      
      /****** Q3: Code Ends here. ******/
    }
    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    setTitle(title) {
      this.setState({Title: title});
    }
    setStatus(status) {
      this.setState({Status: (status ? status : 'New')});
    }
    setOwner(owner) {
      this.setState({Owner: owner});
    }
    setEffort(effort) {
      this.setState({Effort: parseInt(effort)});
    }
    setDue(due) {
      this.setState({Due: new Date(due)});
    }
    /****** Q3: Code Ends here. ******/
    
    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      const issue = {title: this.state.Title, status: this.state.Status, owner: this.state.Owner, effort: this.state.Effort, due: this.state.Due};
      this.props.createissue(issue);
      this.newTitleInput.clear();
      this.newStatusInput.clear();
      this.newOwnerInput.clear();
      this.newEffortInput.clear();
      this.newDueInput.clear();
      /****** Q3: Code Ends here. ******/
    }
  
    render() {
      return (
          <View>
          {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
          <TextInput ref={input=>(this.newTitleInput=input)} placeholder='Title' onChangeText={title=>this.setTitle(title)}/>
          <TextInput ref={input=>(this.newStatusInput=input)} placeholder='Status' onChangeText={status=>this.setStatus(status)}/>
          <TextInput ref={input=>(this.newOwnerInput=input)} placeholder='Owner' onChangeText={owner=>this.setOwner(owner)}/>
          <TextInput ref={input=>(this.newEffortInput=input)} placeholder='Effort' onChangeText={effort=>this.setEffort(effort)}/>
          <TextInput ref={input=>(this.newDueInput=input)} placeholder='Due' onChangeText={due=>this.setDue(due)}/>
          <Button onPress={this.handleSubmit} title="Add to Issuelist"/>
          {/****** Q3: Code Ends here. ******/}
          </View>
      );
    }
  }

class BlackList extends React.Component {
    constructor()
    {   super();
        this.handleSubmit = this.handleSubmit.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = {newName: ''};
        this.setName = this.setName.bind(this);
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    setName(newname) {
        this.setState({newName: newname});
    }
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    const query = "mutation blacklist($newname: String!){addToBlacklist(nameInput: $newname)}";
    const newname = this.state.newName;
    const data = await graphQLFetch(query, {newname});
    this.newNameInput.clear();
    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <TextInput ref={input=>(this.newNameInput=input)} placeholder='Name' onChangeText={newname=>this.setName(newname)}/>
        <Button onPress={this.handleSubmit} title="Add to blacklist"/>
        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [], selector:0 };
        this.createIssue = this.createIssue.bind(this);
    }
    
    componentDidMount() {
    this.loadData();
    }

    async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
        this.loadData();
    }
    }

    async loadPage(selected) {
      this.setState({selector: selected});
    }
    
    
    render() {
    return (
    <ScrollView>
    <View style={{flexDirection: 'row'}}>
    <TouchableOpacity onPress={()=>this.loadPage(0)} style= {[navStyles.nav, {backgroundColor:"#d0eef9"}]}>
    <Text style={navStyles.navText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>this.loadPage(1)} style= {[navStyles.nav, {backgroundColor:"honeydew"}]}>
    <Text style={navStyles.navText}>Filter</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>this.loadPage(2)} style= {[navStyles.nav, {backgroundColor:"lavender"}]}>
    <Text style={navStyles.navText}>Table</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>this.loadPage(3)} style= {[navStyles.nav, {backgroundColor:"lightcyan"}]}>
    <Text style={navStyles.navText}>Add</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>this.loadPage(4)} style= {[navStyles.nav, {backgroundColor:"mistyrose"}]}>
    <Text style={navStyles.navText}>Blacklist</Text>
    </TouchableOpacity>
    </View>
    <>
    {/****** Q1: Start Coding here. ******/}
    { this.state.selector === 0 || this.state.selector === 1 ? <IssueFilter/> : null }
    {/****** Q1: Code ends here ******/}


    {/****** Q2: Start Coding here. ******/}
    { this.state.selector === 0 || this.state.selector === 2 ?<IssueTable issues={this.state.issues}/> : null }
    {/****** Q2: Code ends here ******/}

    
    {/****** Q3: Start Coding here. ******/}
    { this.state.selector === 0 || this.state.selector === 3 ?<IssueAdd createissue={this.createIssue}/> : null}
    {/****** Q3: Code Ends here. ******/}

    {/****** Q4: Start Coding here. ******/}
    { this.state.selector === 0 || this.state.selector === 4 ?<BlackList/> : null}
    {/****** Q4: Code Ends here. ******/}
    </>
    </ScrollView>
    );
  }
}
