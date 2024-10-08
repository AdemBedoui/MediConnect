import React, { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext";
import { useSnackbar } from "notistack";
import axios from "axios";

function ActivateAgenda(props) {
  const { toggleModal } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const activatePatient = async () => {
    try {
      const { data } = await axios.put(
        `/patient/activate/${props.patient._id}`,
        {
          establishment: props.establishment,
        }
      );
      enqueueSnackbar(data.message, { variant: "success" });
      props.fetchPatients();
      toggleModal();
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };

  return (
    <div>
      <h1>retirer du blacklist: {props.patient.user.name} ?</h1>
      <div className="row">
        <button
          onClick={() => {
            activatePatient();
          }}
          className="defaultBtn"
        >
          confirmer
        </button>
        &nbsp;
        <button
          onClick={() => {
            toggleModal();
          }}
          className="cancelBtn"
        >
          annuler
        </button>
      </div>
    </div>
  );
}

export default ActivateAgenda;
