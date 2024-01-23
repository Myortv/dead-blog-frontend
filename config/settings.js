const settings = {
    apiUrl: "http://localhost:8000/blog/api/v1",
    siteName: "myortv",
    captionPlaceholder: "CAPTION WAS STOLEN",
    postsPageEmpty: "NO BLOG POSTS AVAILABLE",
    postPageEmpty: "NO SUCH BLOG POST",
    postCommentsEmpty: "NO ONE LEAVED COMMENT",
    notificaion_expire: 15000,
    expiredTokenErrorId: "PLUGINSTOKENS-expiredsignatureerror",
    decodeError: "PLUGINSTOKENS-decodeerror",
};


const NOTIFICATIONS = {
    bad_user_code: "<span class=\"selected-text\">BAD C0DE</span> Try to acquire valid \"account-creation code\" from admin",
    undefined_error: "<span class=\"selected-text\">UNDEF ERR0R</span>",
    user_already_exsists: "<span class=\"selected-text\">USER ALREADY EXSISTS</span> Choose other username",
    user_created: "User Created",
    user_not_exsists: "This user (username) not exsists",
    user_not_authorized: "Authorization failed (is password correct?)",
    user_logged_in: "Logged In",
    no_posts: "Category empty",
    no_post: "No such post exsists",

};

const urls = {
    login: '/pages/auth.html',
    blogPost: '/pages/blog_post_page.html'
}

export {settings, NOTIFICATIONS, urls};
