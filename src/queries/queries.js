import { gql } from 'apollo-boost';

// Blog

const getBlogsQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        blogs(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            title
            permalink
        }
    }
`;

const getBlogQuery = gql`
    query($permalink: ID!){
        blog(permalink: $permalink){
            id
            permalink
            title
            coverPhoto
            video
            summary
            date
            post
            tags
            creator{
                id
            }
            category{
                id
            }
        }
    }
`;



// Artwork

const getArtworksQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        artworks(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            title
        }
    }
`;

const getArtworkQuery = gql`
    query($id: ID!){
        artwork(id: $id){
            id
            title
            photo
            credits
            summary
            tags
            creator{
                id
            }
            category{
                id
            }
        }
    }
`;



// Vlog

const getVlogsQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        vlogs(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            title
        }
    }
`;

const getVlogQuery = gql`
    query($id: ID!){
        vlog(id: $id){
            id
            title
            coverPhoto
            video
            credits
            summary
            tags
            creator{
                id
            }
            category{
                id
            }
        }
    }
`;



// Song

const getSongsQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        songs(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            title
        }
    }
`;

const getSongQuery = gql`
    query($id: ID!){
        song(id: $id){
            id
            title
            coverPhoto
            song
            credits
            summary
            tags
            creator{
                id
            }
            category{
                id
            }
        }
    }
`;



// Creator

const getCreatorsQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        creators(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            name
        }
    }
`;

const getCreatorQuery = gql`
    query($id: ID!){
        creator(id: $id){
            id
            name
            designation
            photo
            video
            summary
            link
        }
    }
`;



// Category

const getCategoriesQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        categories(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            name
        }
    }
`;

const getCategoryQuery = gql`
    query($id: ID!){
        category(id: $id){
            id
            name
            photo
            video
            summary
            link
        }
    }
`;




// Member

const getMembersQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        members(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            name
        }
    }
`;

const getMemberQuery = gql`
    query($id: ID!){
        member(id: $id){
            id
            name
            designation
            photo
            video
            summary
            link
        }
    }
`;



// Testimonial

const getTestimonialsQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        testimonials(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            name
        }
    }
`;

const getTestimonialQuery = gql`
    query($id: ID!){
        testimonial(id: $id){
            id
            name
            designation
            photo
            video
            summary
            link
        }
    }
`;




// Slide

const getSlidesQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        slides(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            caption
        }
    }
`;

const getSlideQuery = gql`
    query($id: ID!){
        slide(id: $id){
            id
            caption
            photo
        }
    }
`;



// Feedback

const getFeedbacksQuery = gql`
    query($search: String, $first: Int, $last: Int, $cursor: String){
        feedbacks(search: $search, first: $first, last: $last, cursor: $cursor){
            id
            name
        }
    }
`;

const getFeedbackQuery = gql`
    query($id: ID!){
        feedback(id: $id){
            id
            name
            message
            email
            phone
            website
            date
        }
    }
`;



// Home

const getHomeQuery = gql`
    query{
        home{
            websiteName              
            tagline
            logo
            background
            video
            summary
            description
        }
    }
`;



// Footer

const getFooterQuery = gql`
    query{
        footer{
            copyName
            copyYear
            privacy
            terms
            disclaimer
        }
    }
`;



// About

const getAboutQuery = gql`
    query{
        about{
            heading
            yourName
            brandName
            yourPhoto
            brandPhoto
            yourVideo
            brandVideo
            yourInfo
            brandInfo
            description
        }
    }
`;



// Contact

const getContactQuery = gql`
    query{
        contact{
            heading
            info            
            primaryEmail,
            secondaryEmail
            tertiaryEmail            
            primaryPhone
            secondaryPhone
            tertiaryPhone            
            name
            flat
            area
            landmark            
            city
            state
            pin
            description
        }
    }
`;



// Social

const getSocialQuery = gql`
    query{
        social{
            facebook
            instagram
            twitter
            linkedin
            pinterest
            youtube
            whatsapp
            tumblr
            quora
            medium
            github
            codepen
            behance
            dribbble
            yourQuote
        }
    }
`;


export { 
    getBlogsQuery, 
    getBlogQuery, 

    getCreatorsQuery, 
    getCreatorQuery, 

    getCategoriesQuery, 
    getCategoryQuery, 

    getArtworksQuery,
    getArtworkQuery,

    getVlogsQuery,
    getVlogQuery,

    getSongsQuery,
    getSongQuery,

    getMembersQuery,
    getMemberQuery,

    getTestimonialsQuery,
    getTestimonialQuery,

    getSlidesQuery,
    getSlideQuery,

    getFeedbacksQuery,
    getFeedbackQuery,

    getHomeQuery,
    getFooterQuery,
    getAboutQuery,
    getContactQuery,
    getSocialQuery
};

