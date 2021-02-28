import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './css/add.css';
import './css/search.css';
import './css/table.css';

import './config/firebase';
import firebase from 'firebase/app';

import Login from './components/login';
import Start from './components/start';
import Navbar from './components/navbar';
import Header from './components/header';
import Home from './components/home';
import Footer from './components/footer';
import Social from './components/social';
import About from './components/about';
import Contact from './components/contact';

import ReadBlog from './components/readBlog';
import NewBlog from './components/newBlog';

import ReadArtwork from './components/readArtwork';
import NewArtwork from './components/newArtwork';

import ReadVlog from './components/readVlog';
import NewVlog from './components/newVlog';

import ReadSong from './components/readSong';
import NewSong from './components/newSong';

import ReadCreator from './components/readCreator';
import NewCreator from './components/newCreator';

import ReadCategory from './components/readCategory';
import NewCategory from './components/newCategory';

import ReadTeam from './components/readTeam';
import NewTeam from './components/newTeam';

import ReadTestimonial from './components/readTestimonial';
import NewTestimonial from './components/newTestimonial';

import ReadSlideshow from './components/readSlideshow';
import NewSlideshow from './components/newSlideshow';

import AddFeedback from './components/addFeedback';

import Assets from './components/assets';
import Blog from './components/blog';
import Artwork from './components/artwork';
import Vlog from './components/vlog';
import Song from './components/song';
import Creator from './components/creator';
import Category from './components/category';
import Team from './components/team';
import Testimonial from './components/testimonial';
import Slideshow from './components/slideshow';
import Feedback from './components/feedback';

import './css/App.css';
import './css/post.css';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      login: null
    };
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            this.setState({
                login: true
            });
        } else {
          this.setState({
            login: false
          });
        }
    });
  }

  render(){
    
    if(this.state.login === false){
      return (
        <div>
          <div className="main__hide"><Start name="Leàna" /></div>
          <Login />
        </div>
      );
    }  

    if(this.state.login === null){
      return <Start name="Leàna" />
    }

    return(
      <Router>

        <Header />
        <Navbar />

        <Switch>

          <Route exact path = '/slideshow/add' component = {NewSlideshow} />

          <Route exact path = '/slideshow/title/:id' component = {ReadSlideshow} />

          <Route exact path = '/slideshow' component = {Slideshow} />



          <Route exact path = '/about' component = {About} />
          <Route exact path = '/contact' component = {Contact} />



          <Route exact path = '/team/add' component = {NewTeam} />

          <Route exact path = '/team/title/:id' component = {ReadTeam} />

          <Route exact path = '/team' component = {Team} />



          <Route path = '/social' component = {Social} />
          <Route path = '/footer' component = {Footer} />



          <Route path = '/feedback/title/:id' component = {AddFeedback} />

          <Route exact path = '/feedback' component = {Feedback} />



          <Route exact path = '/testimonials/add' component = {NewTestimonial} />

          <Route exact path = '/testimonials/title/:id' component = {ReadTestimonial} />

          <Route path = '/testimonials' component = {Testimonial} />



          <Route exact path = '/blog/add' component = {NewBlog} />

          <Route exact path = '/blog/title/:id' component = {ReadBlog} />

          <Route exact path = '/blog' component = {Blog} />



          <Route exact path = '/artwork/add' component = {NewArtwork} />

          <Route exact path = '/artwork/title/:id' component = {ReadArtwork} />

          <Route exact path = '/artwork' component = {Artwork} />



          <Route exact path = '/vlog/add' component = {NewVlog} />

          <Route exact path = '/vlog/title/:id' component = {ReadVlog} />

          <Route exact path = '/vlog' component = {Vlog} />



          <Route exact path = '/songs/add' component = {NewSong} />

          <Route exact path = '/songs/title/:id' component = {ReadSong} />

          <Route path = '/songs' component = {Song} />



          <Route exact path = '/creators/add' component = {NewCreator} />

          <Route exact path = '/creators/title/:id' component = {ReadCreator} />

          <Route path = '/creators' component = {Creator} />



          <Route exact path = '/categories/add' component = {NewCategory} />

          <Route exact path = '/categories/title/:id' component = {ReadCategory} />

          <Route path = '/categories' component = {Category} />



          <Route exact path = '/assets' component = {Assets} />


          <Route path = '/' component = {Home} />

        </Switch>

      </Router>
    );
  }

}

export default App;
