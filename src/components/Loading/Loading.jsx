import { Bars } from "react-loader-spinner";

function Loading() {
  return (
    <center
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        backgroundColor:"#adadad"
      }}
    >
      <div className="">
        <Bars
          height="150"
          width="150"
          color="#035efc"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </center>
  );
}

export default Loading;
