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
      isPrivate
      user {
        userId
        age
        organization
        name
        profileImg
        createdAt
        updatedAt
      }
      like {
        id
        count
        createdAt
        updatedAt
      }
      comment {
        nextToken
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
      isPrivate
      user {
        userId
        age
        organization
        name
        profileImg
        createdAt
        updatedAt
      }
      like {
        id
        count
        createdAt
        updatedAt
      }
      comment {
        nextToken
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
      isPrivate
      user {
        userId
        age
        organization
        name
        profileImg
        createdAt
        updatedAt
      }
      like {
        id
        count
        createdAt
        updatedAt
      }
      comment {
        nextToken
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
      profileImg
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
      profileImg
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
      profileImg
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
      id
      count
      pressby {
        userId
        age
        organization
        name
        profileImg
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
      id
      count
      pressby {
        userId
        age
        organization
        name
        profileImg
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
      id
      count
      pressby {
        userId
        age
        organization
        name
        profileImg
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      bookId
      post {
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
        isPrivate
        createdAt
        updatedAt
      }
      comment
      commentby
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      bookId
      post {
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
        isPrivate
        createdAt
        updatedAt
      }
      comment
      commentby
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      bookId
      post {
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
        isPrivate
        createdAt
        updatedAt
      }
      comment
      commentby
      id
      createdAt
      updatedAt
    }
  }
`;
