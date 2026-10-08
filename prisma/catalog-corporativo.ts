// Catálogo del área de Derecho corporativo. Cada servicio trae contenido propio
// (en lugar del texto genérico de la semilla). Revisado por el abogado titular.

export type ServiceDetail = {
  name: string;
  slug: string;
  summary: string;
  description: string;
  appliesWhen: string;
  documents: string[];
  steps: string[];
  faqs: { question: string; answer: string }[];
};

export const corporativo = {
  name: "Corporativo",
  slug: "corporativo",
  description: "Constitución, estructura, gobierno y operaciones de empresas, SOFOMES y fideicomisos."
};

export const corporateServices: ServiceDetail[] = [
  {
    name: "Constitución de sociedades mercantiles",
    slug: "constitucion-sociedades",
    summary: "Elección del tipo de sociedad, redacción de estatutos y trámites hasta que la empresa queda inscrita y lista para operar.",
    description: "Te ayudamos a elegir la figura adecuada (S.A., S.A. de C.V., S.A.P.I., S. de R.L. o S.A.S.) según el número de socios, la forma de tomar decisiones y los planes de inversión. Redactamos estatutos a la medida, gestionamos la autorización de la denominación ante la Secretaría de Economía, coordinamos la firma ante notario o corredor público y damos seguimiento a la inscripción en el Registro Público de Comercio y al alta en el RFC.",
    appliesWhen: "Cuando vas a iniciar un negocio con socios, formalizar una actividad que hoy realizas como persona física, separar tu patrimonio del de la empresa o preparar la llegada de inversionistas.",
    documents: ["Identificación oficial y RFC de cada socio", "Comprobante de domicilio de los socios y del domicilio social", "Tres o más opciones de nombre para la sociedad", "Descripción de la actividad del negocio", "Distribución del capital y quién administrará la sociedad"],
    steps: ["Definimos contigo el tipo de sociedad, el capital y las reglas de administración", "Solicitamos la autorización de la denominación y redactamos los estatutos", "Coordinamos la firma ante notario o corredor público", "Damos seguimiento a la inscripción en el Registro Público de Comercio y al alta en el RFC", "Te entregamos el expediente corporativo y el calendario de obligaciones"],
    faqs: [
      { question: "¿Qué tipo de sociedad me conviene?", answer: "Depende de cuántos socios serán, cómo quieren decidir, si entrarán inversionistas y de la actividad. La S.A.P.I., por ejemplo, permite pactos entre accionistas más flexibles; la S.A.S. se constituye en línea, pero tiene límites de ingresos y solo admite personas físicas como accionistas. Lo definimos en la consulta." },
      { question: "¿Puedo constituir una sociedad con un solo socio?", answer: "Sí. La sociedad por acciones simplificada (S.A.S.) admite un solo accionista persona física. Los demás tipos requieren al menos dos socios." }
    ]
  },
  {
    name: "Estructuración y reestructuras corporativas",
    slug: "estructuracion-corporativa",
    summary: "Fusiones, escisiones, transformaciones, aumentos y reducciones de capital, y diseño de grupos empresariales.",
    description: "Cuando una empresa crece, cambia de socios o necesita ordenar su patrimonio, su estructura corporativa debe acompañarla. Diseñamos y ejecutamos fusiones, escisiones, transformaciones de tipo societario, aumentos y reducciones de capital y estructuras de controladora y subsidiarias, cuidando los acuerdos de asamblea, las publicaciones y las inscripciones que exige la Ley General de Sociedades Mercantiles. Coordinamos con tus asesores fiscales y contables el efecto de cada movimiento.",
    appliesWhen: "Cuando vas a integrar o separar negocios, dar entrada o salida a socios, proteger activos en sociedades distintas, preparar una venta o una inversión, o simplificar un grupo con demasiadas empresas.",
    documents: ["Acta constitutiva y reformas a los estatutos", "Libros corporativos y actas de asamblea recientes", "Estados financieros del último ejercicio", "Organigrama actual del grupo y el objetivo que buscas"],
    steps: ["Revisamos la estructura actual y el objetivo de negocio", "Proponemos la ruta jurídica y la coordinamos con tu área fiscal", "Preparamos convocatorias, actas, convenios y publicaciones", "Formalizamos ante fedatario e inscribimos en el Registro Público de Comercio", "Actualizamos libros corporativos y registros"],
    faqs: [
      { question: "¿Una fusión o una escisión tiene efectos fiscales?", answer: "Puede tenerlos. Por eso cada reestructura se diseña junto con tu contador o asesor fiscal antes de ejecutarla." },
      { question: "¿Los acreedores pueden oponerse a una fusión?", answer: "La ley les da un plazo para oponerse, salvo que se paguen o garanticen las deudas o se cumplan los supuestos que la propia ley prevé. Lo resolvemos al planear la operación." }
    ]
  },
  {
    name: "Gobierno corporativo y secretaría corporativa",
    slug: "gobierno-corporativo",
    summary: "Asambleas, actas, libros corporativos, poderes y las obligaciones societarias de cada año, en orden.",
    description: "Llevamos la vida corporativa de tu empresa para que esté en orden cuando la necesites: convocatorias y actas de asambleas y consejos, asamblea anual, libros de registro de acciones y de variaciones de capital, publicaciones en el sistema electrónico de la Secretaría de Economía, otorgamiento y revocación de poderes, e identificación del beneficiario controlador que exige el Código Fiscal de la Federación.",
    appliesWhen: "Cuando tu empresa no ha celebrado asambleas en años, los libros están incompletos, un banco o un inversionista pide documentación corporativa, o necesitas otorgar o revocar poderes.",
    documents: ["Acta constitutiva y reformas", "Libros corporativos existentes", "Actas de asamblea y de consejo de los últimos años", "Poderes vigentes otorgados por la sociedad"],
    steps: ["Diagnosticamos el estado corporativo de la sociedad", "Regularizamos actas, libros y registros pendientes", "Preparamos el calendario anual de asambleas y obligaciones", "Damos seguimiento continuo como secretaría corporativa"],
    faqs: [
      { question: "¿Es obligatorio celebrar una asamblea cada año?", answer: "Sí. La sociedad anónima debe celebrar al menos una asamblea ordinaria al año, entre otras cosas para aprobar los estados financieros del ejercicio. Tenerlas al día evita problemas con bancos, autoridades e inversionistas." },
      { question: "¿Qué es el beneficiario controlador?", answer: "Es la persona física que, en última instancia, controla una sociedad o se beneficia de ella. Las empresas deben identificarlo y conservar esa información; te ayudamos a integrarla y a mantenerla actualizada." }
    ]
  },
  {
    name: "Compraventa de empresas y de acciones",
    slug: "compraventa-sociedades",
    summary: "Compra o venta de una sociedad o de una participación: auditoría legal, negociación, contratos y cierre.",
    description: "Acompañamos a compradores y vendedores en la adquisición o venta de empresas, acciones o partes sociales. Coordinamos la auditoría legal, negociamos la carta de intención y el contrato de compraventa con sus declaraciones, garantías, indemnizaciones y mecanismos de pago, y ejecutamos el cierre: transmisión de títulos, asambleas, renuncias y nombramientos, e inscripciones.",
    appliesWhen: "Cuando vas a comprar una empresa o entrar como socio, vender tu participación, recibir a un inversionista o salir de un negocio.",
    documents: ["Acta constitutiva, reformas y libros corporativos de la sociedad", "Estados financieros y principales contratos", "Términos comerciales acordados o propuestos", "Información sobre juicios, permisos y contingencias conocidas"],
    steps: ["Revisamos los términos y definimos la estructura de la operación", "Coordinamos la auditoría legal y te reportamos los hallazgos", "Negociamos la carta de intención y el contrato definitivo", "Preparamos y ejecutamos el cierre", "Atendemos los ajustes y las obligaciones posteriores al cierre"],
    faqs: [
      { question: "¿Qué conviene más, comprar acciones o comprar activos?", answer: "Con acciones adquieres la sociedad con todo su historial, incluidas sus contingencias; con activos eliges qué bienes compras. La conveniencia depende del negocio y del efecto fiscal, y la analizamos contigo." },
      { question: "¿Qué protege al comprador si aparecen deudas ocultas?", answer: "Las declaraciones, garantías e indemnizaciones del contrato, y mecanismos como pagos diferidos o retenciones de parte del precio." }
    ]
  },
  {
    name: "Auditoría legal (due diligence)",
    slug: "auditoria-legal",
    summary: "Revisión jurídica de una empresa para conocer sus riesgos antes de invertir, comprar, financiar o reorganizarse.",
    description: "Revisamos la situación corporativa, contractual, inmobiliaria, regulatoria y litigiosa de una empresa, y te entregamos un informe claro: qué está en orden, qué riesgos existen, qué tan relevantes son y cómo corregirlos o protegerte en la operación.",
    appliesWhen: "Antes de comprar una empresa o entrar como socio, al buscar financiamiento o inversión, o cuando quieres saber en qué estado legal está tu propia empresa.",
    documents: ["Documentos y libros corporativos", "Contratos relevantes con clientes, proveedores y financiadores", "Títulos de propiedad y contratos de arrendamiento", "Permisos, licencias y relación de juicios en curso"],
    steps: ["Definimos contigo el alcance y la lista de información", "Revisamos la documentación", "Aclaramos dudas con la empresa", "Entregamos el informe con riesgos y recomendaciones"],
    faqs: [
      { question: "¿Cuánto tarda una auditoría legal?", answer: "Depende del tamaño de la empresa y de qué tan rápido se entrega la información. Fijamos el calendario contigo al definir el alcance." },
      { question: "¿Puedo auditar mi propia empresa?", answer: "Sí, y es recomendable antes de buscar inversión o venderla: te permite corregir pendientes con tiempo y negociar en mejores condiciones." }
    ]
  },
  {
    name: "Convenios entre socios y accionistas",
    slug: "convenios-accionistas",
    summary: "Reglas claras entre socios: toma de decisiones, entrada y salida, transmisión de acciones y solución de diferencias.",
    description: "Un buen convenio entre socios evita la mayoría de los conflictos. Redactamos y negociamos acuerdos que regulan el gobierno de la empresa, las mayorías especiales, el derecho de preferencia, las cláusulas de arrastre y de acompañamiento, la salida de socios, la valuación de acciones, la no competencia y los mecanismos para resolver un empate, en congruencia con los estatutos.",
    appliesWhen: "Al iniciar un negocio con socios, cuando entra un inversionista, cuando hay desacuerdos recurrentes o cuando un socio quiere salir.",
    documents: ["Estatutos vigentes", "Composición accionaria actual", "Acuerdos previos entre los socios, aunque sean informales", "Temas que hoy generan desacuerdo"],
    steps: ["Escuchamos a los socios y definimos los temas a regular", "Proponemos el clausulado y lo ajustamos a los estatutos", "Negociamos con las partes y sus asesores", "Formalizamos el convenio y, si hace falta, la reforma de estatutos"],
    faqs: [
      { question: "¿El convenio entre socios sustituye a los estatutos?", answer: "No, se complementan. Algunos pactos conviene incluirlos también en los estatutos para que surtan efectos frente a la sociedad y a terceros; por eso los revisamos juntos." },
      { question: "¿Qué pasa si un socio no cumple el convenio?", answer: "El convenio debe prever las consecuencias y la forma de resolver la controversia, por ejemplo mediante mediación o arbitraje, para evitar un juicio largo." }
    ]
  },
  {
    name: "Conflictos societarios",
    slug: "conflictos-socios",
    summary: "Defensa en disputas entre socios: impugnación de asambleas, responsabilidad de administradores, derecho de información y salida de socios.",
    description: "Representamos a socios y a sociedades en controversias internas: impugnación de acuerdos de asamblea, acciones de responsabilidad contra administradores, ejercicio del derecho de información, exclusión o separación de socios y bloqueos en la toma de decisiones. Cuando es posible, buscamos primero una salida negociada que proteja el valor de la empresa.",
    appliesWhen: "Cuando se tomaron acuerdos sin convocarte o en tu contra, se te niega información de la empresa, sospechas un mal manejo de los administradores o los socios no logran ponerse de acuerdo.",
    documents: ["Estatutos y convenio entre socios, si existe", "Convocatorias y actas de las asambleas en disputa", "Comunicaciones entre los socios", "Estados financieros a los que tengas acceso"],
    steps: ["Revisamos los hechos, los documentos y los plazos", "Evaluamos la vía: negociación, mediación, arbitraje o juicio", "Presentamos la acción o la defensa que corresponda", "Buscamos medidas para proteger tu participación mientras se resuelve"],
    faqs: [
      { question: "¿Hay un plazo para impugnar un acuerdo de asamblea?", answer: "Sí, y es breve. Por eso conviene consultarnos en cuanto conozcas el acuerdo." },
      { question: "¿Puedo exigir que los administradores rindan cuentas?", answer: "Los socios tienen derecho a información y, en ciertos casos, a exigir responsabilidad a los administradores. Revisamos qué vía procede en tu caso." }
    ]
  },
  {
    name: "Sociedades financieras de objeto múltiple (SOFOM)",
    slug: "sofom",
    summary: "Constitución de SOFOMES, registro ante la CONDUSEF y cumplimiento regulatorio y en prevención de lavado de dinero.",
    description: "Acompañamos a quienes quieren otorgar créditos, arrendamiento financiero o factoraje por medio de una SOFOM. Constituimos la sociedad con el objeto y los requisitos que exige la ley, tramitamos el registro ante la CONDUSEF y el dictamen técnico de la CNBV en materia de prevención de lavado de dinero, y preparamos el manual de cumplimiento, los contratos de adhesión y la documentación que la entidad debe mantener. Después damos seguimiento a reportes, auditorías y renovaciones.",
    appliesWhen: "Cuando vas a dedicarte de forma habitual al crédito, al arrendamiento financiero o al factoraje, o cuando ya operas una SOFOM y necesitas regularizarla, renovar su registro o atender un requerimiento.",
    documents: ["Plan de negocio y tipo de operaciones que realizarás", "Identificación de los accionistas y del beneficiario controlador", "Estructura de capital y origen de los recursos", "Modelos de contratos que pretendes usar"],
    steps: ["Revisamos el modelo de negocio y los requisitos aplicables", "Constituimos la sociedad o adecuamos sus estatutos", "Preparamos el manual de prevención de lavado de dinero y la designación del oficial de cumplimiento", "Tramitamos el dictamen ante la CNBV y el registro ante la CONDUSEF", "Damos seguimiento a reportes, contratos de adhesión y renovaciones"],
    faqs: [
      { question: "¿Qué diferencia hay entre una SOFOM regulada y una no regulada?", answer: "La regulada mantiene vínculos patrimoniales con instituciones financieras o se ubica en otros supuestos que la ley prevé, y la supervisa la CNBV. La no regulada (E.N.R.) no tiene esos vínculos, pero debe registrarse ante la CONDUSEF y cumplir en materia de prevención de lavado de dinero." },
      { question: "¿El registro ante la CONDUSEF es permanente?", answer: "No. Debe renovarse periódicamente y mantener el dictamen favorable en prevención de lavado de dinero; si se incumple, el registro puede cancelarse." }
    ]
  },
  {
    name: "Fideicomisos y estructuras fiduciarias",
    slug: "fideicomisos",
    summary: "Diseño y negociación de fideicomisos de garantía, de administración, inmobiliarios, de inversión y testamentarios.",
    description: "El fideicomiso permite destinar bienes a un fin específico bajo la administración de una institución fiduciaria. Lo usamos para garantizar créditos, desarrollar proyectos inmobiliarios, administrar inversiones, ordenar la transmisión de un patrimonio o dar certeza a operaciones entre socios. Diseñamos la estructura, negociamos el contrato con la fiduciaria y las partes, y te acompañamos en la operación, las instrucciones y la extinción del fideicomiso.",
    appliesWhen: "Cuando necesitas garantizar el pago de un crédito, desarrollar un inmueble con varios inversionistas, separar bienes para un propósito, ordenar la transmisión de un patrimonio o administrar recursos de forma transparente.",
    documents: ["Descripción de la operación y de las partes", "Documentos de los bienes que se aportarán", "Identificación de fideicomitentes y fideicomisarios", "Propuesta o borrador de la fiduciaria, si ya existe"],
    steps: ["Definimos el fin del fideicomiso y el papel de cada parte", "Elegimos el tipo de fideicomiso y te orientamos sobre la fiduciaria", "Negociamos el contrato y sus reglas de operación", "Acompañamos la aportación de bienes y la operación", "Atendemos las modificaciones y la extinción del fideicomiso"],
    faqs: [
      { question: "¿Quién puede actuar como fiduciaria?", answer: "Solo las instituciones autorizadas por la ley, como bancos, casas de bolsa, aseguradoras y afianzadoras, y, para ciertos fideicomisos de garantía, algunas otras entidades financieras. Te orientamos para elegir la adecuada." },
      { question: "¿Un fideicomiso sirve para planear una sucesión?", answer: "Puede ser una herramienta útil junto con el testamento, porque permite establecer reglas sobre cómo y cuándo se transmiten los bienes. Lo analizamos según tu patrimonio y tu familia." }
    ]
  },
  {
    name: "Prevención de lavado de dinero y actividades vulnerables",
    slug: "pld-actividades-vulnerables",
    summary: "Alta ante el SAT, avisos, manual de cumplimiento y acompañamiento en revisiones conforme a la ley antilavado.",
    description: "Algunas actividades, como la venta de inmuebles o vehículos, el otorgamiento de préstamos, el arrendamiento de inmuebles, la recepción de donativos o ciertos servicios profesionales, son consideradas vulnerables por la Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita. Identificamos si tu empresa realiza alguna, la damos de alta ante el SAT, designamos al responsable de cumplimiento, preparamos el manual y los formatos de identificación de clientes, y te apoyamos con los avisos y en las visitas de verificación.",
    appliesWhen: "Cuando tu negocio vende inmuebles, vehículos, joyas u obras de arte, otorga préstamos, arrienda inmuebles, recibe donativos o presta servicios que la ley considera vulnerables, o cuando recibiste un requerimiento o una visita de la autoridad.",
    documents: ["Descripción de las operaciones y de los montos habituales", "Acta constitutiva y datos del representante legal", "Expedientes de clientes, si ya los integras", "Requerimientos o actas de la autoridad, en su caso"],
    steps: ["Determinamos si realizas actividades vulnerables y qué umbrales aplican", "Realizamos el alta y designamos al responsable de cumplimiento", "Preparamos el manual, los formatos y la capacitación", "Te acompañamos con los avisos y en las visitas de verificación"],
    faqs: [
      { question: "¿Toda empresa debe darse de alta?", answer: "No. Solo quienes realizan actividades vulnerables, y en muchos casos las obligaciones dependen de que las operaciones superen ciertos montos. Lo revisamos contigo." },
      { question: "¿Qué pasa si no presento los avisos?", answer: "La ley prevé multas que pueden ser elevadas. Si tienes pendientes, conviene regularizarlos cuanto antes." }
    ]
  },
  {
    name: "Inversión extranjera",
    slug: "inversion-extranjera",
    summary: "Participación de extranjeros en empresas mexicanas, inscripción en el Registro Nacional de Inversiones Extranjeras e informes.",
    description: "Asesoramos a inversionistas extranjeros y a empresas mexicanas con socios del exterior: revisamos los límites y autorizaciones que fija la Ley de Inversión Extranjera según la actividad, inscribimos a la sociedad en el Registro Nacional de Inversiones Extranjeras y te apoyamos con los informes periódicos y con las autorizaciones que correspondan.",
    appliesWhen: "Cuando un socio extranjero entra a tu empresa, constituyes una sociedad con capital del exterior, una empresa extranjera quiere operar en México o necesitas regularizar los informes ante el registro.",
    documents: ["Documentos de identidad o constitutivos del inversionista extranjero, apostillados y traducidos", "Acta constitutiva de la sociedad mexicana", "Descripción de la actividad y del monto de la inversión"],
    steps: ["Revisamos si la actividad tiene restricciones o requiere autorización", "Estructuramos la entrada del inversionista", "Inscribimos a la sociedad en el registro", "Damos seguimiento a los informes periódicos"],
    faqs: [
      { question: "¿Un extranjero puede ser dueño del 100 % de una empresa en México?", answer: "En la mayoría de las actividades, sí. Algunas están reservadas o tienen límites de participación; lo revisamos según el giro." },
      { question: "¿Los documentos extranjeros deben apostillarse?", answer: "Por regla general, los documentos públicos emitidos en el extranjero deben apostillarse o legalizarse, y traducirse, para usarse en México." }
    ]
  },
  {
    name: "Empresa familiar y sucesión empresarial",
    slug: "empresa-familiar",
    summary: "Protocolo familiar, órganos de gobierno y planeación de la transmisión de la empresa a la siguiente generación.",
    description: "En la empresa familiar se cruzan el negocio, el patrimonio y la familia. Te ayudamos a definir reglas claras con un protocolo familiar, a crear órganos como el consejo de familia y el consejo de administración, y a planear la sucesión mediante estatutos, convenios entre socios, fideicomisos y testamentos coordinados, para que el negocio sobreviva al cambio de generación.",
    appliesWhen: "Cuando varios familiares participan en la empresa, se acerca un relevo generacional, hay tensiones entre ramas de la familia o el fundador quiere dejar ordenada su sucesión.",
    documents: ["Estructura accionaria actual", "Estatutos y convenios entre socios", "Relación de familiares que participan y su papel", "Testamentos o planes previos, si existen"],
    steps: ["Entrevistamos a los miembros de la familia", "Proponemos reglas de gobierno y de sucesión", "Redactamos el protocolo y los instrumentos jurídicos", "Acompañamos su implementación"],
    faqs: [
      { question: "¿El protocolo familiar obliga jurídicamente?", answer: "Por sí mismo es un acuerdo de organización entre la familia. Para que sus reglas clave sean exigibles, se trasladan a estatutos, convenios, fideicomisos y testamentos." },
      { question: "¿Cuándo conviene empezar?", answer: "Antes de que surjan conflictos o urja un relevo. Planear con tiempo permite acuerdos más serenos." }
    ]
  },
  {
    name: "Disolución y liquidación de sociedades",
    slug: "disolucion-liquidacion",
    summary: "Cierre ordenado de una sociedad: acuerdos, nombramiento del liquidador, balance final y cancelación de registros.",
    description: "Cuando una empresa deja de operar, cerrarla correctamente evita que sigan generándose obligaciones y responsabilidades para socios y administradores. Te acompañamos en el acuerdo de disolución, el nombramiento del liquidador, la conclusión de las operaciones, el balance final, la distribución del remanente y la cancelación de la inscripción en el Registro Público de Comercio, en coordinación con tu contador para la baja ante el SAT.",
    appliesWhen: "Cuando la sociedad ya no tiene actividad, cumplió su objeto, los socios decidieron cerrarla o se presentó alguna causa de disolución prevista en la ley o en los estatutos.",
    documents: ["Acta constitutiva y reformas", "Libros corporativos", "Estados financieros recientes", "Relación de deudas, créditos y bienes de la sociedad"],
    steps: ["Revisamos la situación de la sociedad y sus pendientes", "Formalizamos el acuerdo de disolución y el nombramiento del liquidador", "Acompañamos la liquidación y el balance final", "Cancelamos la inscripción y cerramos el expediente"],
    faqs: [
      { question: "¿Basta con dejar de operar la empresa?", answer: "No. Mientras la sociedad exista, sigue teniendo obligaciones. La disolución y la liquidación formales son las que permiten cerrarla." },
      { question: "¿Qué pasa con las deudas de la sociedad?", answer: "Se pagan durante la liquidación con los bienes de la sociedad; solo el remanente se reparte entre los socios." }
    ]
  },
  {
    name: "Cumplimiento normativo corporativo (compliance)",
    slug: "compliance",
    summary: "Programas de integridad, políticas internas y prevención de riesgos penales y administrativos de la empresa.",
    description: "Las personas morales pueden responder penalmente por ciertos delitos cometidos en su nombre, y las empresas que contratan con el gobierno deben contar con una política de integridad. Diseñamos programas de cumplimiento a la medida: identificación de riesgos, código de conducta, políticas sobre regalos y conflictos de interés, canal de denuncias, capacitación y procedimientos de investigación interna.",
    appliesWhen: "Cuando tu empresa contrata con el gobierno, opera en un sector regulado, crece y necesita controles, o enfrenta una investigación o una denuncia interna.",
    documents: ["Descripción de las operaciones y de los principales riesgos", "Políticas y códigos internos existentes", "Organigrama y responsables de cada área"],
    steps: ["Identificamos los riesgos legales de la operación", "Diseñamos políticas, controles y el canal de denuncias", "Capacitamos a directivos y colaboradores", "Revisamos el programa de forma periódica"],
    faqs: [
      { question: "¿Un programa de cumplimiento protege a la empresa?", answer: "Contar con controles efectivos antes de que ocurra un hecho puede tomarse en cuenta para atenuar la responsabilidad de la empresa. Su mayor valor está en prevenir." },
      { question: "¿Es solo para empresas grandes?", answer: "No. Se dimensiona según el tamaño y los riesgos de cada empresa." }
    ]
  }
];

/** Servicios que pasaron de Mercantil a Corporativo; su versión en Mercantil se despublica. */
export const movedFromMercantil = ["constitucion-sociedades", "conflictos-socios"];
