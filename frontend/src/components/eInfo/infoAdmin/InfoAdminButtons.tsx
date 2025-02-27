import React from "react";

import { Button, Popconfirm, Tooltip } from "antd";
import { useCreateCerificateRequirementsDataForUsers } from "hooks/einfo-hooks/useCreateCerificateRequirementsDataForUsers";
import { useSetCVonTrue } from "hooks/einfo-hooks/useSetCVonTrue";
import { useSetFirstSuprachOnTrue } from "hooks/einfo-hooks/useSetFirstSuprachOnTrue";
import { useSetSecondSuprachOnTrue } from "hooks/einfo-hooks/useSetSecondSuprachOnTrue";
import { useSetBootcampOnTrue } from "hooks/einfo-hooks/useSetBootcampOnTrue";

const InfoAdminButtons = () => {
  const createCertificateRequirementsData =
    useCreateCerificateRequirementsDataForUsers();
  const setCV = useSetCVonTrue();
  const setFirstSuprach = useSetFirstSuprachOnTrue();
  const setSecondSuprach = useSetSecondSuprachOnTrue();
  const setBootcamp = useSetBootcampOnTrue();
  return (
    <>
      <Tooltip title="Generiranje zapisa za svakog korisnika za kojeg je postavljena pozicija za aktivnu akademsku godinu. Generiat će zapis za postavljanje jeli osoba ispunila suprach, bootcamp i zivotopis">
        <Popconfirm
          title="Generiranje zapisa"
          description="Jesi li siguran da želiš generirat zapise za sve korisnike?"
          onConfirm={() => createCertificateRequirementsData.mutate()}
          okText="Generiraj"
          cancelText="Odustani"
        >
          <Button
            style={{ marginLeft: "10px" }}
            rootClassName="btnIcon"
            className="button"
            type="primary"
          >
            Dodaj zapise za ovu godinu
          </Button>
        </Popconfirm>
      </Tooltip>
      <Tooltip
        placement="bottom"
        title="Ukoliko imaš večinski da su svi ispunili. Postavi svima da su ispunili i onda makneš ljude koje nisu."
      >
        <Popconfirm
          title="Postavljanje svima da su ispunili prvi suprach"
          onConfirm={() => setFirstSuprach.mutate()}
          okText="Postavi"
          cancelText="Odustani"
        >
          <Button
            style={{ marginLeft: "10px" }}
            rootClassName="btnIcon"
            className="button"
            type="primary"
          >
            Prvi suprach ispunjen
          </Button>
        </Popconfirm>
        <Popconfirm
          title="Postavljanje svima da su ispunili drugi suprach"
          onConfirm={() => setSecondSuprach.mutate()}
          okText="Postavi"
          cancelText="Odustani"
        >
          <Button
            style={{ marginLeft: "10px" }}
            rootClassName="btnIcon"
            className="button"
            type="primary"
          >
            Drugi suprach ispunjen
          </Button>
        </Popconfirm>
        <Popconfirm
          title="Postavljanje svima da su predali životopis"
          onConfirm={() => setCV.mutate()}
          okText="Yes"
          cancelText="No"
        >
          <Button
            style={{ marginLeft: "10px" }}
            rootClassName="btnIcon"
            className="button"
            type="primary"
          >
            Predali životopis
          </Button>
        </Popconfirm>
        <Popconfirm
          title="Postavljanje svima da su riješili bootcamp"
          onConfirm={() => setBootcamp.mutate()}
          okText="Yes"
          cancelText="No"
        >
          <Button
            style={{ marginLeft: "10px" }}
            rootClassName="btnIcon"
            className="button"
            type="primary"
          >
            Riješili bootcamp
          </Button>
        </Popconfirm>
      </Tooltip>
    </>
  );
};

export default InfoAdminButtons;
