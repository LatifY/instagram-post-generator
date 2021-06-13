import React, { useState, createRef, useEffect } from "react";

import { language } from "./localizations";
import {
  AvatarLoader,
  NameLoader,
  ImageLoader,
  TimeLoader,
  PostNameLoader,
  PostTextLoader,
} from "./loaders";
import "./style.scss";
import {
  ThreeDotIcon,
  OutlineLikeIcon,
  FilledLikeIcon,
  OutlineCommentLikeIcon,
  FilledCommentLikeIcon,
  CommentIcon,
  ShareIcon,
  OutlineSaveIcon,
  FilledSaveIcon,
  EmojiIcon,
  DownArrow
} from "./icons";
import ActionButton from "./components/ActionButton";
import slugify from "slugify";
import { useScreenshot } from "use-react-screenshot";

const formatNumber = (number) => {
  if (Number.isNaN(number)) {
    return 0;
  }
  return Intl.NumberFormat().format(number);
};

const formatText = (text) => {
  text = text.replaceAll("-", "");
  return slugify(text, "_");
};

export default function App() {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentIsLiked, setCommentIsLiked] = useState(false);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState();
  const [image, setImage] = useState();
  const [likes, setLikes] = useState(50);
  const [commentsMore, setCommentsMore] = useState(20);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState();
  const [time, setTime] = useState();

  const [lang, setLang] = useState("tr");
  const [langText, setLangText] = useState();

  const postRef = createRef(null);
  const [screenshot, takeScreenshot] = useScreenshot();
  const downloadRef = createRef();

  const getScreenshot = () => {
    window.scrollTo(0, 0);
    takeScreenshot(postRef.current);
  };

  useEffect(() => {
    setLangText(language[lang]);
  }, [lang]);

  useEffect(() => {
    if (screenshot) {
      downloadRef.current.click();
    }
  }, [screenshot]);

  const addComment = () => {
    if (
      commentName === null ||
      commentName == "" ||
      commentText === null ||
      commentText == ""
    ) {
      return null;
    }
    let newComments = comments;
    var comment = {
      name: commentName,
      text: commentText,
      isLiked: commentIsLiked,
    };
    newComments.push(comment);
    setComments(newComments);
    setCommentName("");
    setCommentText("");
    setCommentIsLiked(false);
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", function () {
      setAvatar(this.result);
    });
    try {
      reader.readAsDataURL(file);
    } catch {}
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      setImage(this.result);
    });
    try {
      reader.readAsDataURL(file);
    } catch {}
  };

  return (
    <>
      <div className="gradient"></div>
      <br />
      <br />
      <div className="post" id="post" ref={postRef}>
        <div className="post-header">
          <div className="author">
            {(avatar && <img src={avatar} />) || <AvatarLoader />}
            <div className="name link">
              {(name && formatText(name)) || <NameLoader />}
            </div>
          </div>
          <div className="more">
            <ThreeDotIcon />
          </div>
        </div>
        <div className="post-content">
          {(image && <img style={{ objectFit: "cover" }} src={image} />) || (
            <ImageLoader />
          )}
        </div>
        <div className="post-actions">
          <div className="left">
            <span>{isLiked ? <FilledLikeIcon /> : <OutlineLikeIcon />}</span>
            <span>
              <CommentIcon />
            </span>
            <span>
              <ShareIcon />
            </span>
          </div>
          <div className="right">
            <span>{isSaved ? <FilledSaveIcon /> : <OutlineSaveIcon />}</span>
          </div>
        </div>
        <div className="post-info">
          <div className="post-info-like">
            <span>{formatNumber(likes)}</span> {langText?.likes}
          </div>
          <div className="post-info-text">
            <div className="name link">
              {(name && formatText(name)) || <PostNameLoader />}
            </div>
            <div className="description">
              {(text && text) || <PostTextLoader />}
            </div>
            <div className="description-more"></div>
          </div>
          <div className="post-info-comments-more">
            {langText?.comments_more_before}{" "}
            <span>{formatNumber(commentsMore)}</span>{" "}
            {langText?.comments_more_after}
          </div>

          <div className="post-info-comments">
            {comments.map((comment) => (
              <div key={comment.name} className="comment">
                <div className="name link">{comment.name}</div>
                <div className="text">{comment.text}</div>
                <span>
                  {comment.isLiked ? (
                    <>
                      <FilledCommentLikeIcon />
                    </>
                  ) : (
                    <OutlineCommentLikeIcon />
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="post-info-time">
            <span>
              {(time && time) || <TimeLoader />} {langText?.ago}
            </span>
          </div>
        </div>
        <div className="divider"></div>

        <div className="post-comment">
          <span>
            <EmojiIcon />
          </span>
          <div className="text">{langText?.add_comment}</div>
          <div className="share">{langText?.share}</div>
        </div>
      </div>
      <br />
      <div className="mid-container">
        <button className="create" onClick={getScreenshot}>
          {langText?.create}
        </button>
        <a href="#settings"><h1><DownArrow/></h1></a>
      </div>

      <div className="post-settings" id="settings">
        <h1 className="header">{langText?.settings}</h1>
        <div className="setting">
          <h1 className="title">{langText?.profile}</h1>
          <div className="input form">
            <h3>{langText?.username}</h3>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                e.target.value.length < 25 ? setName(e.target.value) : 0
              }
            />
          </div>
          <div className="file form">
            <h3 className="pd-more">{langText?.avatar}</h3>
            <label htmlFor="avatar">{langText?.choose_file}</label>
            <input type="file" onChange={handleAvatar} id="avatar" />
          </div>
        </div>
        <div className="setting">
          <h1 className="title">{langText?.post}</h1>
          <div className="textarea form">
            <h3>{langText?.writing}</h3>

            <textarea
              value={text}
              onChange={(e) =>
                e.target.value.length < 100 ? setText(e.target.value) : null
              }
            />
          </div>
          <div className="input form">
            <h3>{langText?.likes_num}</h3>

            <input
              type="number"
              value={likes}
              onChange={(e) =>
                e.target.value.length < 15
                  ? setLikes(parseInt(e.target.value))
                  : null
              }
            />
          </div>
          <div className="file form">
            <h3 className="pd-more">{langText?.image}</h3>
            <label htmlFor="image">{langText?.choose_file}</label>
            <input type="file" onChange={handleImage} id="image" />
          </div>
          <div className="input form">
            <h3>{langText?.comments_num}</h3>

            <input
              type="number"
              value={commentsMore}
              onChange={(e) =>
                e.target.value.length < 15
                  ? setCommentsMore(parseInt(e.target.value))
                  : null
              }
            />
          </div>
          <div style={{ height: "1px" }}></div>
          <div className="input form">
            <h3>{langText?.time}</h3>
            <input
              type="text"
              value={time}
              onChange={(e) =>
                e.target.value.length < 20 ? setTime(e.target.value) : null
              }
            />
          </div>
          <div className="actions form">
            <h3>{langText?.actions}</h3>
            <div className="row">
              {isLiked ? (
                <ActionButton
                  icon={<FilledLikeIcon />}
                  onClick={() => setIsLiked(false)}
                />
              ) : (
                <ActionButton
                  icon={<OutlineLikeIcon />}
                  onClick={() => setIsLiked(true)}
                />
              )}

              {isSaved ? (
                <ActionButton
                  icon={<FilledSaveIcon />}
                  onClick={() => setIsSaved(false)}
                />
              ) : (
                <ActionButton
                  icon={<OutlineSaveIcon />}
                  onClick={() => setIsSaved(true)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="setting">
          <h1 className="title">{langText?.create_comment}</h1>
          <div className="input form">
            <h3>{langText?.username}</h3>
            <input
              type="text"
              value={commentName}
              onChange={(e) =>
                e.target.value.length < 25 ? setCommentName(e.target.value) : 0
              }
            />
          </div>

          <div className="textarea form">
            <h3>{langText?.comment}</h3>
            <textarea
              value={commentText}
              onChange={(e) =>
                e.target.value.length < 100
                  ? setCommentText(e.target.value)
                  : null
              }
            />
          </div>

          <div className="actions form">
            {commentIsLiked ? (
              <ActionButton
                icon={<FilledLikeIcon />}
                onClick={() => setCommentIsLiked(false)}
              />
            ) : (
              <ActionButton
                icon={<OutlineLikeIcon />}
                onClick={() => setCommentIsLiked(true)}
              />
            )}
          </div>
          <input
            type="submit"
            onClick={addComment}
            value={langText?.add}
            className="btn"
          />
        </div>

        <div className="download">
          {screenshot && (
            <a
              ref={downloadRef}
              href={screenshot}
              download={(name && `post-${name}.png`) || `post.png`}
            ></a>
          )}
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="footer">
        <p><span>Instagram Post Generator</span> - <a href="https://latifyilmaz.com">Latif Yılmaz</a></p>
        <p>💻 ve ☕ ile yapıldı :)</p>
      </div>
    </>
  );
}
