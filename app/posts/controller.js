const Model = require('./model');
const to = require('../../core/to');

exports.get = async (req, res) => {
  let id = req.params.id;
  console.log('consultando post: ' + id);

  const [err, data] = to(Model.findOne({ _id: id }));
  if (!err) {
    console.log('Post: ' + data);
    res.json({ sucess: true, data: data });
  } else {
    console.log('Post não encontrado');
    res.status(500).json({ err: err, sucess: false });
  }
}

exports.index = async (req, res) => {
  const data = await Model.find({});
  if (data) {
    res.json({ sucess: true, data: data })
  } else {
    res.json({ sucess: false })
  }
}

exports.new = async (req, res) => {
  const model = req.body; 
  console.log("Processando uma requisição de um novo Post");
  const post = new Model(model);
  const [err, data] = await to(post.save());

  if (!err) {
      console.log("Post criado");
      res.status(201).json({
        success: true , data: data });
    }else {
    console.log("Erro ao inserir no banco: " + err);
    res.status(500).json({ erro: err });
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id;
  const model = await Model.findOne({ _id: id });

  if (model) {
    model.ativo = false;
    const data = await model.save();

    if (data) {
      res.status(204).json({ success: true, data });
      console.log('Post delete');
    } else {
      res.status(500).json({ success: false, data, err: "Erro ao salvar, tente novamente." });
      console.log('Save error');
    }
  } else {
    console.log('Post não encontrado.');
    logger.info('Post não encontrado.');
    res.json({ success: false, data: model, err: "Usuario não encontrado." });
  }
}