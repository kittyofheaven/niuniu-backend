class SuccessResponse {
  constructor(message, data) {
    this.data = data;
    this.message = message
  }

  send200(res) {
    res.status(200).json({
      status: true,
      code: 200,
      message: this.message || 'Request completed successfully',
      data: this.data,
    });
  }

  send201(res) {
    res.status(201).json({
      status: true,
      code: 201,
      message: this.message || 'Resource created successfully',
      data: this.data,
    });
  }
}

module.exports = SuccessResponse;

