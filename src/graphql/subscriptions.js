/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      isbn
      title
      authors
      longLine
      thumbnail
      review
      publishedDate
      postedDate
      rating
      owner
      user {
        userId
        age
        organization
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      isbn
      title
      authors
      longLine
      thumbnail
      review
      publishedDate
      postedDate
      rating
      owner
      user {
        userId
        age
        organization
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      isbn
      title
      authors
      longLine
      thumbnail
      review
      publishedDate
      postedDate
      rating
      owner
      user {
        userId
        age
        organization
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      userId
      age
      organization
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      userId
      age
      organization
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      userId
      age
      organization
      name
      createdAt
      updatedAt
    }
  }
`;
