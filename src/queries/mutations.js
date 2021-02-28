import { gql } from 'apollo-boost';

// Blog

const deleteBlogMutation = gql`
    mutation($id: ID!){
        deleteBlog(id: $id){
            id
        }
    }
`;

const addBlogMutation = gql`
    mutation($permalink: String!, $title: String!, $coverPhoto: String, $video: String, $summary: String, $date: String, $post: String, $creatorId: String, $categoryId: String, $tags: [String]){
        addBlog(permalink: $permalink, title: $title, coverPhoto: $coverPhoto, video: $video, summary: $summary, date: $date, post: $post, creatorId: $creatorId, categoryId: $categoryId, tags: $tags){
            id
        }
    }
`;

const updateBlogMutation = gql`
    mutation($id: ID!, $permalink: String!, $title: String!, $coverPhoto: String, $video: String, $summary: String, $date: String, $post: String, $creatorId: String, $categoryId: String, $tags: [String]){
        updateBlog(id: $id, permalink: $permalink, title: $title, coverPhoto: $coverPhoto, video: $video, summary: $summary, date: $date, post: $post, creatorId: $creatorId, categoryId: $categoryId, tags: $tags){
            id
        }
    }
`;


// Artwork

const deleteArtworkMutation = gql`
    mutation($id: ID!){
        deleteArtwork(id: $id){
            id
        }
    }
`;

const addArtworkMutation = gql`
    mutation($title: String!, $photo: String, $credits: String, $summary: String, $creatorId: String, $categoryId: String, $tags: [String]){
        addArtwork(title: $title, photo: $photo, credits: $credits, summary: $summary, creatorId: $creatorId, categoryId: $categoryId, tags: $tags){
            id
        }
    }
`;

const updateArtworkMutation = gql`
    mutation($id: ID!, $title: String!, $photo: String, $credits: String, $summary: String, $creatorId: String, $categoryId: String, $tags: [String]){
        updateArtwork(id: $id, title: $title, photo: $photo, credits: $credits, summary: $summary, creatorId: $creatorId, categoryId: $categoryId, tags: $tags){
            id
        }
    }
`;



// Vlog

const deleteVlogMutation = gql`
    mutation($id: ID!){
        deleteVlog(id: $id){
            id
        }
    }
`;

const addVlogMutation = gql`
    mutation($title: String!, $coverPhoto: String, $video: String, $credits: String, $summary: String, $creatorId: String, $categoryId: String, $tags: [String]){
        addVlog(title: $title, coverPhoto: $coverPhoto, video: $video, credits: $credits, summary: $summary, creatorId: $creatorId, categoryId: $categoryId, tags: $tags){
            id
        }
    }
`;

const updateVlogMutation = gql`
    mutation($id: ID!, $title: String!, $coverPhoto: String, $video: String, $credits: String, $summary: String, $creatorId: String, $categoryId: String, $tags: [String]){
        updateVlog(id: $id, title: $title, coverPhoto: $coverPhoto, video: $video, credits: $credits, summary: $summary, creatorId: $creatorId, categoryId: $categoryId, tags: $tags){
            id
        }
    }
`;



// Song

const deleteSongMutation = gql`
    mutation($id: ID!){
        deleteSong(id: $id){
            id
        }
    }
`;

const addSongMutation = gql`
    mutation($title: String!, $coverPhoto: String, $song: String, $credits: String, $summary: String, $creatorId: String, $categoryId: String, $tags: [String]){
        addSong(title: $title, coverPhoto: $coverPhoto, song: $song, credits: $credits, summary: $summary, creatorId: $creatorId, categoryId: $categoryId, tags: $tags){
            id
        }
    }
`;

const updateSongMutation = gql`
    mutation($id: ID!, $title: String!, $coverPhoto: String, $song: String, $credits: String, $summary: String, $creatorId: String, $categoryId: String, $tags: [String]){
        updateSong(id: $id, title: $title, coverPhoto: $coverPhoto, song: $song, credits: $credits, summary: $summary, creatorId: $creatorId, categoryId: $categoryId, tags: $tags){
            id
        }
    }
`;



// Creator

const deleteCreatorMutation = gql`
    mutation($id: ID!){
        deleteCreator(id: $id){
            id
        }
    }
`;

const addCreatorMutation = gql`
    mutation($name: String!, $designation: String, $photo: String, $video: String, $summary: String, $link: String){
        addCreator(name: $name, designation: $designation, photo: $photo, video: $video, summary: $summary, link: $link){
            id
        }
    }
`;

const updateCreatorMutation = gql`
    mutation($id: ID!, $name: String!, $designation: String, $photo: String, $video: String, $summary: String, $link: String){
        updateCreator(id: $id, name: $name, designation: $designation, photo: $photo, video: $video, summary: $summary, link: $link){
            id
        }
    }
`;



// Category

const deleteCategoryMutation = gql`
    mutation($id: ID!){
        deleteCategory(id: $id){
            id
        }
    }
`;

const addCategoryMutation = gql`
    mutation($name: String!, $photo: String, $video: String, $summary: String, $link: String){
        addCategory(name: $name, photo: $photo, video: $video, summary: $summary, link: $link){
            id
        }
    }
`;

const updateCategoryMutation = gql`
    mutation($id: ID!, $name: String!, $photo: String, $video: String, $summary: String, $link: String){
        updateCategory(id: $id, name: $name, photo: $photo, video: $video, summary: $summary, link: $link){
            id
        }
    }
`;



// Member

const deleteMemberMutation = gql`
    mutation($id: ID!){
        deleteMember(id: $id){
            id
        }
    }
`;

const addMemberMutation = gql`
    mutation($name: String!, $designation: String, $photo: String, $video: String, $summary: String, $link: String){
        addMember(name: $name, designation: $designation, photo: $photo, video: $video, summary: $summary, link: $link){
            id
        }
    }
`;

const updateMemberMutation = gql`
    mutation($id: ID!, $name: String!, $designation: String, $photo: String, $video: String, $summary: String, $link: String){
        updateMember(id: $id, name: $name, designation: $designation, photo: $photo, video: $video, summary: $summary, link: $link){
            id
        }
    }
`;



// Testimonial

const deleteTestimonialMutation = gql`
    mutation($id: ID!){
        deleteTestimonial(id: $id){
            id
        }
    }
`;

const addTestimonialMutation = gql`
    mutation($name: String!, $designation: String, $photo: String, $video: String, $summary: String, $link: String){
        addTestimonial(name: $name, designation: $designation, photo: $photo, video: $video, summary: $summary, link: $link){
            id
        }
    }
`;

const updateTestimonialMutation = gql`
    mutation($id: ID!, $name: String!, $designation: String, $photo: String, $video: String, $summary: String, $link: String){
        updateTestimonial(id: $id, name: $name, designation: $designation, photo: $photo, video: $video, summary: $summary, link: $link){
            id
        }
    }
`;



// Slide

const deleteSlideMutation = gql`
    mutation($id: ID!){
        deleteSlide(id: $id){
            id
        }
    }
`;

const addSlideMutation = gql`
    mutation($caption: String!, $photo: String!){
        addSlide(caption: $caption, photo: $photo){
            id
        }
    }
`;

const updateSlideMutation = gql`
    mutation($id: ID!, $caption: String!, $photo: String!){
        updateSlide(id: $id, caption: $caption, photo: $photo){
            id
        }
    }
`;



// Feedback

const deleteFeedbackMutation = gql`
    mutation($id: ID!){
        deleteFeedback(id: $id){
            id
        }
    }
`;



// Home

const updateHomeMutation = gql`
    mutation($websiteName: String!, $tagline: String, $logo: String, $video: String, $background: String, $summary: String, $description: String){
        updateHome(websiteName: $websiteName, tagline: $tagline, logo: $logo, background: $background, video: $video, summary: $summary, description: $description){
            id
            websiteName
        }
    }
`;



// Footer

const updateFooterMutation = gql`
    mutation($copyName: String, $copyYear: String, $privacy: String, $terms: String, $disclaimer: String){
        updateFooter(copyName: $copyName, copyYear: $copyYear, privacy: $privacy, terms: $terms, disclaimer: $disclaimer){
            id
        }
    }
`;



// About

const updateAboutMutation = gql`
    mutation($heading: String, $yourName: String, $brandName: String, $yourPhoto: String, $brandPhoto: String, $yourVideo: String, $brandVideo: String, $yourInfo: String, $brandInfo: String, $description: String){
        updateAbout(heading: $heading, yourName: $yourName, brandName: $brandName, yourPhoto: $yourPhoto, brandPhoto: $brandPhoto, yourVideo: $yourVideo, brandVideo: $brandVideo, yourInfo: $yourInfo, brandInfo: $brandInfo, description: $description){
            id
        }
    }
`;



// Contact

const updateContactMutation = gql`
    mutation($heading: String, $info: String, $primaryEmail: String, $secondaryEmail: String, $tertiaryEmail: String, $primaryPhone: String, $secondaryPhone: String, $tertiaryPhone: String, $name: String, $flat: String, $area: String, $landmark: String, $city: String, $state: String, $pin: String, $description: String){
        updateContact(heading: $heading,info: $info, primaryEmail: $primaryEmail, secondaryEmail: $secondaryEmail, tertiaryEmail: $tertiaryEmail, primaryPhone: $primaryPhone, secondaryPhone: $secondaryPhone, tertiaryPhone: $tertiaryPhone, name: $name, flat: $flat, area: $area, landmark: $landmark, city: $city, state: $state, pin: $pin, description: $description){
            id
        }
    }
`;



// Social

const updateSocialMutation = gql`
    mutation($facebook: String, $instagram: String, $twitter: String, $linkedin: String, $pinterest: String, $youtube: String, $whatsapp: String, $tumblr: String, $quora: String, $medium: String, $github: String, $codepen: String, $behance: String, $dribbble: String, $yourQuote: String){
        updateSocial(facebook: $facebook, instagram: $instagram, twitter: $twitter, linkedin: $linkedin, pinterest: $pinterest, youtube: $youtube, whatsapp: $whatsapp, tumblr: $tumblr, quora: $quora, medium: $medium, github: $github, codepen: $codepen, behance: $behance,dribbble: $dribbble, yourQuote: $yourQuote){
            id
        }
    }
`;



// Login

const loginMutation =gql`
    mutation($email: String!, $password: String!){
        login(email: $email, password: $password){
            value
            message
        }
    }
`;



// Logout

const logoutMutation =gql`
    mutation{
        logout{
            value
        }
    }
`;



export { 
    deleteBlogMutation, 
    addBlogMutation, 
    updateBlogMutation, 
    
    deleteCreatorMutation, 
    addCreatorMutation, 
    updateCreatorMutation, 

    deleteCategoryMutation, 
    addCategoryMutation, 
    updateCategoryMutation, 

    deleteArtworkMutation,
    addArtworkMutation,
    updateArtworkMutation,

    deleteVlogMutation,
    addVlogMutation,
    updateVlogMutation,

    deleteSongMutation,
    addSongMutation,
    updateSongMutation,

    deleteMemberMutation,
    addMemberMutation,
    updateMemberMutation,

    deleteTestimonialMutation,
    addTestimonialMutation,
    updateTestimonialMutation,

    deleteSlideMutation,
    addSlideMutation,
    updateSlideMutation,

    deleteFeedbackMutation,

    updateHomeMutation,
    updateFooterMutation,
    updateAboutMutation,
    updateContactMutation,
    updateSocialMutation,

    loginMutation,
    logoutMutation
};

