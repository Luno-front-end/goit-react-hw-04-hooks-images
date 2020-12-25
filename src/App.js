// {PROPTYPES}
// {Рефакторінг}

import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Api from "./services/FetchAPI";
import Searchbar from "./components/Searchbar";
import ImageGalleryItem from "./components/ImageGallery";
import Modal from "./components/Modal";
import Loader from "./components/Loader";
import Button from "./components/Button";
import "./styles/styles.css";

export default function Finder() {
  const [nameImage, setNameImage] = useState("");
  const [imagesArray, setImagesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (nameImage === "") {
      return;
    }
    searchImagesFetch();
  }, [nameImage]);

  const searchImagesFetch = () => {
    setLoading(true);

    Api.imagesFetch(nameImage, page, imagesArray)
      .then((imagesArrayFetch) =>
        checkNewFetchImagesArray(imagesArrayFetch.hits)
      )
      .catch((error) => setError(error))
      .finally(
        () => setLoading(false),
        setPage((prevState) => prevState + 1)
      );
  };

  const checkNewFetchImagesArray = (imagesArrayFetch) => {
    imagesArrayFetch === []
      ? setImagesArray(imagesArrayFetch)
      : setImagesArray((prevState) => [...prevState, ...imagesArrayFetch]);
  };

  const togleModal = () => {
    setShowModal(!showModal);
  };

  const isHendleFormaSubmit = (nameImage) => {
    reset();

    setNameImage(nameImage);
  };
  const reset = () => {
    setPage(1);
    setImagesArray([]);
  };

  const isCurrentImage = (currentImage, tags) => {
    setSelectedImage([currentImage, tags]);
    setShowModal(true);
  };
  const scrollGallery = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
  };

  const onClickLoadMore = () => {
    searchImagesFetch();
    scrollGallery();
  };

  return (
    <>
      <Searchbar onSubmit={isHendleFormaSubmit} />
      {/* {!nameImage && (
        <div className="container-paragraphInfo">
          <p className="paragraphInfo">
            Відсутнє ім'я! Будь ласка введіть його в поле яке вище.
          </p>
        </div>
      )} */}
      {imagesArray.length === 0 && (
        <div className="container-paragraphInfo">
          <p className="paragraphInfo">
            Таких картинок {`${nameImage}`} не знайдено або ви не ввели ім'я
            картинок.
          </p>
        </div>
      )}

      {imagesArray && (
        <ImageGalleryItem arrayImages={imagesArray} onSubmit={isCurrentImage} />
      )}
      {showModal && (
        <Modal onClose={() => togleModal()}>
          <img src={selectedImage[0]} alt={selectedImage[1]} />
        </Modal>
      )}

      <ToastContainer autoClose={3000} />
      {loading && <Loader />}

      {imagesArray.length !== 0 && (
        <Button onClick={onClickLoadMore}>Завантажити ще</Button>
      )}
    </>
  );
}

// export default class Finder extends Component {
//   state = {
//     nameImage: "",
//     imagesArray: [],
//     loading: false,
//     selectedImage: null,
//     page: 1,
//     showModal: false,
//     error: null,
//   };

// componentDidUpdate(prevProps, prevState) {
//   if (prevState.nameImage !== this.state.nameImage) {
//     this.setState({
//       page: 1,
//       nameImage: this.state.nameImage,
//       imagesArray: [],
//     });
//     this.searchImagesFetch();
//   }
// }
// searchImagesFetch = () => {
//   const { page, nameImage } = this.state;

//   this.setState({ loading: true });

//   Api.imagesFetch(nameImage, page)
//     .then((imagesArrayFetch) =>
//       this.checkNewFetchImagesArray(imagesArrayFetch.hits)
//     )
//     .catch((error) => this.setState({ error }))
//     .finally(() =>
//       this.setState((prevState) => ({
//         loading: false,
//         page: prevState.page + 1,
//       }))
//     );
// };

// checkNewFetchImagesArray = (imagesArrayFetch) => {
//   imagesArrayFetch === []
//     ? this.setState({
//         imagesArray: imagesArrayFetch,
//       })
//     : this.setState((prevState) => ({
//         imagesArray: [...prevState.imagesArray, ...imagesArrayFetch],
//       }));
// };

// togleModal = () => {
//   this.setState(({ showModal }) => ({ showModal: !showModal }));
// };

// isHendleFormaSubmit = (nameImage) => {
//   this.setState({ nameImage });
// };

// isCurrentImage = (currentImage, tags) => {
//   this.setState({
//     selectedImage: [currentImage, tags],
//     showModal: true,
//   });
// };
// scrollGallery = () => {
//   setTimeout(() => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: "smooth",
//     });
//   }, 1000);
// };

// onClickLoadMore = () => {
//   this.searchImagesFetch();
//   this.scrollGallery();
// };
//   render() {
//     const {
//       loading,
//       showModal,
//       nameImage,
//       imagesArray,
//       selectedImage,
//     } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.isHendleFormaSubmit} />

//         {imagesArray && (
//           <ImageGalleryItem
//             arrayImages={imagesArray}
//             onSubmit={this.isCurrentImage}
//           />
//         )}
//         {showModal && (
//           <Modal onClose={() => this.togleModal()}>
//             <img src={selectedImage[0]} alt={selectedImage[1]} />
//           </Modal>
//         )}
//         {!nameImage && (
//           <div className="container-paragraphInfo">
//             <p className="paragraphInfo">
//               Відсутнє ім'я! Будь ласка введіть його в поле яке вище.
//             </p>
//           </div>
//         )}
//         <ToastContainer autoClose={3000} />
//         {loading && <Loader />}

//         {imagesArray.length !== 0 && (
//           <Button onClick={this.onClickLoadMore}>Завантажити ще</Button>
//         )}
//       </>
//     );
//   }
// }
