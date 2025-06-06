import { useState, useContext, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import MyContext from "../../../context/data/MyContext";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import { fireDb, storage } from "../../../firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, Timestamp, addDoc } from "firebase/firestore";
function CreateBlog() {
  const context = useContext(MyContext);
  const { mode, loading, setloading } = context;

  const [blogs, setBlogs] = useState({
    title: "",
    category: "",
    content: "",
    time: Timestamp.now(),
  });
  const [thumbnail, setthumbnail] = useState();

  const [text, settext] = useState("");

  const addPost = async () => {
    if (
      blogs.title === "" ||
      blogs.category === "" ||
      blogs.content === "" ||
      blogs.thumbnail === ""
    ) {
      return toast.error("All fields are required");
    }
    uploadImage();
  };

  const uploadImage = () => {
    setloading(true);
    if (!thumbnail) return;
    const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
    uploadBytes(imageRef, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const productRef = collection(fireDb, "blogPost");
        try {
          addDoc(productRef, {
            blogs,
            thumbnail: url,
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          });
          toast.success("Post Added Successfully");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
          setloading(false);
        } catch (error) {
          toast.error(error);
          setloading(false);
        }
      });
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }
  return (
    <div>
      {loading && <Loader />}
      <div className=" container mx-auto max-w-5xl py-6">
        <div
          className="p-5"
          style={{
            background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
            borderBottom:
              mode === "dark"
                ? " 4px solid rgb(226, 232, 240)"
                : " 4px solid rgb(30, 41, 59)",
          }}
        >
          {/* Top Item  */}
          <div className="mb-2 flex justify-between">
            <div className="flex gap-2 items-center">
              {/* Dashboard Link  */}
              <Link to={"/dashboard"}>
                <BsFillArrowLeftCircleFill size={25} />
              </Link>

              {/* Text  */}
              <Typography
                variant="h4"
                style={{
                  color: mode === "dark" ? "white" : "black",
                }}
              >
                Create blog
              </Typography>
            </div>
          </div>

          {/* main Content  */}
          <div className="mb-3">
            {/* Thumbnail  */}
            {thumbnail && (
              <img
                className=" w-full rounded-md mb-3 "
                src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
                alt="thumbnail"
              />
            )}

            {/* Text  */}
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-semibold"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Upload Thumbnail
            </Typography>

            {/* First Thumbnail Input  */}
            <input
              type="file"
              label="Upload thumbnail"
              className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
              style={{
                background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
              }}
              onChange={(e) => setthumbnail(e.target.files[0])}
            />
          </div>

          {/* Second Title Input */}
          <div className="mb-3">
            <input
              label="Enter your Title"
              className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${
                   mode === "dark" ? "placeholder-black" : "placeholder-black"
                 }`}
              placeholder="Enter Your Title"
              style={{
                background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
              }}
              name="title"
              value={blogs.title}
              onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
            />
          </div>

          {/* Third Category Input  */}
          <div className="mb-3">
            <input
              label="Enter your Category"
              className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${
                   mode === "dark" ? "placeholder-black" : "placeholder-black"
                 }`}
              placeholder="Enter Your Category"
              style={{
                background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
              }}
              name="category"
              value={blogs.category}
              onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
            />
          </div>

          {/* Four Editor  */}

          <Editor
            apiKey="a2ne6xm062211o1nrq509oq0vf2wc2lk33n4mh24wgdogp8g"
            value={blogs.content}
            onEditorChange={(newValue, editor) => {
              setBlogs({ ...blogs, content: newValue });
              settext(editor.getContent({ format: "text" }));
            }}
            onInit={(_evt, editor) => {
              settext(editor.getContent({ format: "text" }));
            }}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "a11ychecker",
                "advcode",
                "advlist",
                "advtable",
                "anchor",
                "autocorrect",
                "autolink",
                "autoresize",
                "autosave",
                "casechange",
                "charmap",
                "checklist",
                "code",
                "codesample",
                "directionality",
                "editimage",
                "emoticons",
                "exportpdf",
                "footnotes",
                "formatpainter",
                "fullscreen",
                "help",
                "image",
                "importcss",
                "inlinecss",
                "insertdatetime",
                "link",
                "linkchecker",
                "lists",
                "media",
                "mediaembed",
                "mentions",
                "nonbreaking",
                "pagebreak",
                "pageembed",
                "permanentpen",
                "powerpaste",
                "preview",
                "quickbars",
                "save",
                "searchreplace",
                "table",
                "tableofcontents",
                "tinydrive",
                "tinymcespellchecker",
                "typography",
                "visualblocks",
                "visualchars",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist checklist | outdent indent | link image media | code preview exportpdf | fullscreen",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />

          {/* Five Submit Button  */}
          <Button
            className=" w-full mt-5"
            onClick={addPost}
            style={{
              background:
                mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
              color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
            }}
          >
            Send
          </Button>

          {/* Six Preview Section  */}
          <div className="">
            <h1 className=" text-center mb-3 text-2xl">Preview</h1>
            <div className="content">
              <div
                className={`
                        [&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${
                          mode === "dark"
                            ? "[&>h1]:text-[#ff4d4d]"
                            : "[&>h1]:text-black"
                        }

                        [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
                        ${
                          mode === "dark"
                            ? "[&>h2]:text-white"
                            : "[&>h2]:text-black"
                        }

                        [&>h3]:text-[18.72] [&>h3]:font-bold [&>h3]:mb-2.5
                        ${
                          mode === "dark"
                            ? "[&>h3]:text-white"
                            : "[&>h3]:text-black"
                        }

                        [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
                        ${
                          mode === "dark"
                            ? "[&>h4]:text-white"
                            : "[&>h4]:text-black"
                        }

                        [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
                        ${
                          mode === "dark"
                            ? "[&>h5]:text-white"
                            : "[&>h5]:text-black"
                        }

                        [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
                        ${
                          mode === "dark"
                            ? "[&>h6]:text-white"
                            : "[&>h6]:text-black"
                        }

                        [&>p]:text-[16px] [&>p]:mb-1.5
                        ${
                          mode === "dark"
                            ? "[&>p]:text-[#7efff5]"
                            : "[&>p]:text-black"
                        }

                        [&>ul]:list-disc [&>ul]:mb-2
                        ${
                          mode === "dark"
                            ? "[&>ul]:text-white"
                            : "[&>ul]:text-black"
                        }

                        [&>ol]:list-decimal [&>li]:mb-10
                        ${
                          mode === "dark"
                            ? "[&>ol]:text-white"
                            : "[&>ol]:text-black"
                        }

                        [&>li]:list-decimal [&>ol]:mb-2
                        ${
                          mode === "dark"
                            ? "[&>ol]:text-white"
                            : "[&>ol]:text-black"
                        }

                        [&>img]:rounded-lg
                        `}
                dangerouslySetInnerHTML={createMarkup(blogs.content)}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
