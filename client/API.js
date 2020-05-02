import fetch from 'isomorphic-unfetch';

//fetch options
const options = {
    headers: {
        'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include'
};

export async function isAuthenticated(context) {
    //check if we are in server side
    if (!context) {
        //if not check user on client side
        const response = await fetch(`${process.env.API_URL}/api/user/`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        });
        if (response.ok) {
            const user = await response.json();
            return user;
        } else {
            return null;
        }
    }

    //check if user is logged in in server side
    const response = await fetch(`${process.env.API_URL}/api/user/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            cookie: context.req.headers.cookie
        }
    });

    if (response.ok) {
        const user = await response.json();
        return user;
    } else {
        return {};
    }
}


function handleError(response) {
    if (response.status === 500) {
        const errorRes = new Error(response.statusText);
        errorRes.response = { message: response.statusText };
        throw errorRes;
    } else {
        return response.json().then(error => {
            const errorRes = new Error(error.message);
            errorRes.response = error;
            throw errorRes;
        });
    }
}

//sign up user
export function signupUser(user) {
    options.method = 'POST';
    options.body = JSON.stringify(user);
    
    return fetch(`${process.env.API_URL}/api/user/signup`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//login user post request
export function loginUser(user) {
    options.method = 'POST';
    options.body = JSON.stringify(user);
    
    return fetch(`${process.env.API_URL}/api/user/login`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
               return handleError(response);
            }
        });
}

//logout user
export function logoutUser() {
    return fetch(`${process.env.API_URL}/api/user/logout`, {method: 'GET', credentials: 'include'})
      .then(response => {
        return response.text();
      });
}

//edit user
export function editUser(updatedInfo) {
    options.method = 'PUT';
    options.body = JSON.stringify(updatedInfo);

    return fetch(`${process.env.API_URL}/api/user/edit`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//send password reset email
export function sendEmail(email) {
    options.method = 'POST';
    options.body = JSON.stringify(email);

    return fetch(`${process.env.API_URL}/api/user/forgot_password`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//get request to check token
export function checkToken(token) {
    return fetch(`${process.env.API_URL}/api/user/reset_password/${token}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//reset password
export function resetPassword(password, token) {
    options.method = 'POST';
    options.body = JSON.stringify(password);

    return fetch(`${process.env.API_URL}/api/user/reset_password/${token}`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//get user info
export function getUserInfo(username) {
    return fetch(`${process.env.API_URL}/api/user/${username}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        })
}

//create blog post request
export function createBlogPost(post) {
    options.method = 'POST';
    options.body = JSON.stringify(post);
    return fetch(`${process.env.API_URL}/api/blogs/new`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//update blog post
export function updateBlogPost(post, id) {
    options.method = 'PUT';
    options.body = JSON.stringify(post);

    return fetch(`${process.env.API_URL}/api/blogs/update/${id}`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//delete blog post
export function deleteBlogPost(id) {
    return fetch(`${process.env.API_URL}/api/blogs/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return handleError(response);
        }
    });
}

//publish blob post
export function publishBlogPost(id) {
    return fetch(`${process.env.API_URL}/api/blogs/publish/${id}`, {
        method: 'PUT',
        credentials: 'include',
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return handleError(response);
        }
    });
}

//unpublish blog post
export function unpublishBlogPost(id) {
    return fetch(`${process.env.API_URL}/api/blogs/private/${id}`, {
        method: 'PUT',
        credentials: 'include',
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return handleError(response);
        }
    });
}

//show blog posts in dashboard
export function getDashboardPosts(page) {
    return fetch(`${process.env.API_URL}/api/blogs/dashboard/${page}`, {
        method: 'GET',
        credentials: 'include',
    }).then(response => {
        return response.json();
    });
}

//get all published blog posts to show into the home page
export function getPublishedBlogPosts(page) {
    return fetch(`${process.env.API_URL}/api/blogs/home/${page}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//get posts for profile page
export function getProfilePosts(page, author) {
    return fetch(`${process.env.API_URL}/api/blogs/${author}/${page}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//get individual post
export function getPost(slug) {
    return fetch(`${process.env.API_URL}/api/blogs/post/${slug}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//get post by id
export function getPostById(id) {
    return fetch(`${process.env.API_URL}/api/blogs/update/post/${id}`, {method: 'GET', credentials: 'include'})
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//get comments
export function getComments(postId) {
    return fetch(`${process.env.API_URL}/api/comment/${postId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}
//add comment
export function addComment(comment) {
    options.method = 'POST';
    options.body = JSON.stringify(comment);
    return fetch(`${process.env.API_URL}/api/comment`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//edit comment
export function editComment(commentId, body) {
    options.method = 'PATCH';
    options.body = JSON.stringify(body);

    return fetch(`${process.env.API_URL}/api/comment/${commentId}`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        });
}

//delete comment
export function deleteComment(commentId) {
    return fetch(`${process.env.API_URL}/api/comment/${commentId}`, {
        method: 'DELETE',
        credentials: 'include',
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return handleError(response);
        }
    })
}

//get tags
export function getTags() {
    return fetch(`${process.env.API_URL}/api/blogs/tags`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        });
}

//get posts by tag
export function getPostsByTag(tag) {
    return fetch(`${process.env.API_URL}/api/blogs/tags/${tag}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return handleError(response);
            }
        })
}