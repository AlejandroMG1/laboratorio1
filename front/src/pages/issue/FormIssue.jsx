/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import BaseForm from 'components/BaseForm';
import Input from 'components/Input';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SelectForm from 'components/SelectForm';
import { getAllProyectos, getbyidProyecto } from 'servicios/proyecto';
import { auth } from 'servicios/auth';
import Loading from 'components/Loading';
import { createIssue, getIssue } from 'servicios/issues';
import { toast } from 'react-toastify';
import { getProjectDevelopers } from 'servicios/usuer';

const FormIssue = () => {
  const [loading, setLoading] = useState(true);
  const [issue, setissue] = useState();
  const [originProject, setOriginProject] = useState();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(true);
  const [optionsProyectos, setoptionsProyectos] = useState([]);
  const [proyecto, setproyecto] = useState('');
  const [optionsDevelopers, setoptionsDevelopers] = useState([]);
  const [developer, setdeveloper] = useState();
  const [optionsCategoria, setoptionsCategoria] = useState([
    { value: 'MissingTask', label: 'MissingTask' },
    { value: 'Bug', label: 'Bug' },
    { value: 'Additional', label: 'Additional' },
  ]);
  const [categoria, setCategoria] = useState('');
  const [optionsPrioridad, setoptionsPrioridad] = useState([
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
  ]);
  const [prioridad, setprioridad] = useState('');
  const [optionsStatus, setoptionsStatus] = useState([]);
  const [status, setstatus] = useState('');
  const [hourEstimate, sethourEstimate] = useState(0);
  const [dueDate, setdueDate] = useState('');
  const [closeDate, setcloseDate] = useState('');
  const [descripción, setDescripción] = useState('');

  const [allowStatus, setallowStatus] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (isCreate) {
        await createIssue(
          {
            description: descripción,
            category: categoria,
            priority: prioridad,
            dueDate,
            project: proyecto,
          },
          auth.id
        );
        toast.success('Issue creado');
        navigate('/issues');
      } else {
        // eslint-disable-next-line no-console
        console.log(issue);
      }
    } catch {
      toast.error('Error');
    }
  };

  useEffect(async () => {
    if (location.pathname.includes('/CrearIssue')) {
      setIsCreate(true);
      if (id) {
        setOriginProject(await getbyidProyecto(id, auth.id));
        setproyecto(id);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else if (id) {
      setIsCreate(false);
      getIssue(id, auth.id).then(async (i) => {
        setissue(i);
        if (!i.developer) {
          getProjectDevelopers(i.projectId, auth.id).then((developers) => {
            setoptionsDevelopers(
              developers.map((dev) => ({ value: dev.id, label: dev.email }))
            );
          });
        }
        setListStatus(i);
        setLoading(false);
      });
    }

    getAllProyectos(auth.id).then((p) => {
      setoptionsProyectos(
        p.map((proj) => ({ value: proj.id, label: proj.name }))
      );
    });
  }, []);

  const setListStatus = (i) => {
    let statusList = [];
    switch (auth.role) {
      case 'Admin':
        statusList = ['InternalValidation', 'ClientValidation'];
        break;
      case 'Cliente':
        statusList = ['ClientValidation', 'Closed'];
        break;
      case 'Developer':
        statusList = ['Estimated', 'InternalValidation'];
        break;
      default:
        break;
    }
    setallowStatus(statusList.includes(i.status));
    setoptionsStatus(statusList);
  };

  return loading ? (
    <Loading />
  ) : (
    <div>
      <BaseForm
        title={isCreate ? 'Nuevo issue' : 'Issue'}
        onSubmit={submitForm}
        titleSubmit={isCreate ? 'Crear issue' : 'Actualizar'}
        onCancelar={() => {
          navigate('/issues');
        }}
      >
        <SelectForm
          title='Proyecto'
          options={optionsProyectos}
          onChange={(e) => {
            setproyecto(e.value);
          }}
          defaultValue={() => {
            if (originProject) {
              return { label: originProject.name, value: originProject.id };
            }
            if (issue) {
              return { label: issue.project.name, value: issue.project.id };
            }
            return null;
          }}
          disable={originProject || !isCreate}
        />
        {!isCreate ? (
          <SelectForm
            disable={
              (isCreate && !(proyecto || proyecto !== '')) ||
              auth.role !== 'Administrador'
            }
            title='Desarrollador'
            options={optionsDevelopers}
            onChange={(e) => {
              issue.developerId = e.value;
            }}
            defaultValue={() => {
              if (!isCreate && issue.developer) {
                return {
                  value: issue.developerId,
                  label: issue.developer.email,
                };
              }
              return null;
            }}
          />
        ) : null}

        <SelectForm
          title='Categoria'
          options={optionsCategoria}
          onChange={(e) => {
            setCategoria(e.value);
          }}
          disable={!isCreate && auth.role !== 'Administrador'}
          defaultValue={
            !isCreate ? { value: issue.category, label: issue.category } : null
          }
        />

        <SelectForm
          title='Prioridad'
          options={optionsPrioridad}
          onChange={(e) => {
            setprioridad(e.value);
          }}
          disable={!isCreate && auth.role !== 'Cliente'}
          defaultValue={
            !isCreate ? { value: issue.priority, label: issue.priority } : null
          }
        />
        {!isCreate ? (
          <SelectForm
            title='Status'
            options={optionsStatus}
            onChange={(e) => {
              setstatus(e.value);
            }}
            defaultValue={
              !isCreate ? { value: issue.status, label: issue.status } : null
            }
            disable={!allowStatus}
          />
        ) : null}
        {!isCreate ? (
          <Input
            text='Horas estimadas'
            name='hourEstimate'
            placeholder='Ingresa horas estimadas'
            type='number'
            value={hourEstimate}
            onChange={(e) => {
              sethourEstimate(e.target.value);
            }}
            disable={auth.role !== 'Desarrollador'}
          />
        ) : null}

        <Input
          text='Fecha de vencimiento'
          name='dueDate'
          placeholder='Ingresa fecha de vencimiento'
          type='Date'
          value={dueDate}
          onChange={(e) => {
            setdueDate(e.target.value);
          }}
        />
        {!isCreate ? (
          <Input
            text='Fecha de cierre'
            name='closeDate'
            placeholder='Ingresa fecha de cierre'
            type='Date'
            value={closeDate}
            onChange={(e) => {
              setcloseDate(e.target.value);
            }}
            disable
          />
        ) : null}

        <div className='w-full'>
          <span className='block text-gray-700 text-lg font-bold mb-2 ml-6'>
            Descripción
          </span>
          <textarea
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='Descripción'
            rows='10'
            placeholder='Descripción'
            value={descripción}
            onChange={(e) => {
              setDescripción(e.target.value);
            }}
          />
        </div>
      </BaseForm>
    </div>
  );
};

export default FormIssue;
